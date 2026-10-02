"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { deleteAdminProduct, listAdminProducts, saveAdminProduct } from "@/lib/admin/product-repository";
import { deleteAdminShop, listAdminShops, saveAdminShop } from "@/lib/admin/shop-repository";
import type { AdminRecord, AdminResource } from "@/lib/admin/resources";

const STORAGE_PREFIX = "skymart.admin.v1";

function isAdminRecord(value: unknown): value is AdminRecord {
  if (!value || typeof value !== "object" || !("id" in value)) return false;
  return typeof value.id === "string";
}

function readRecords(resource: AdminResource): AdminRecord[] {
  const stored = window.localStorage.getItem(`${STORAGE_PREFIX}.${resource.key}`);
  if (!stored) return [...resource.records];
  const parsed: unknown = JSON.parse(stored);
  if (!Array.isArray(parsed) || !parsed.every(isAdminRecord)) throw new Error("รูปแบบข้อมูลที่บันทึกไว้ไม่ถูกต้อง");
  return parsed;
}

export type AdminRecordsState = {
  records: AdminRecord[];
  setRecords: Dispatch<SetStateAction<AdminRecord[]>>;
  hydrated: boolean;
  storageError: string;
  saveRecord: (record: AdminRecord) => Promise<AdminRecord>;
  deleteRecord: (id: string) => Promise<void>;
};

export function useAdminRecords(resource: AdminResource): AdminRecordsState {
  const [records, setRecords] = useState<AdminRecord[]>([...resource.records]);
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(async () => {
      if (cancelled) return;
      try {
        const nextRecords = resource.key === "products"
          ? await listAdminProducts()
          : resource.key === "shops" ? await listAdminShops() : readRecords(resource);
        if (!cancelled) setRecords(nextRecords);
      } catch (error) {
        if (cancelled) return;
        setStorageError(error instanceof Error ? error.message : "อ่านข้อมูลจาก Supabase ไม่สำเร็จ");
        setRecords(resource.key === "products" || resource.key === "shops" ? [] : [...resource.records]);
      } finally {
        if (!cancelled) setHydrated(true);
      }
    });
    return () => { cancelled = true; };
  }, [resource]);

  useEffect(() => {
    if (!hydrated || resource.key === "products" || resource.key === "shops") return;
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}.${resource.key}`, JSON.stringify(records));
    } catch {
      queueMicrotask(() => setStorageError("เบราว์เซอร์ไม่สามารถบันทึกข้อมูลได้ โปรดตรวจสอบพื้นที่จัดเก็บหรือโหมดส่วนตัว"));
    }
  }, [hydrated, records, resource.key]);

  const saveRecord = async (record: AdminRecord) => {
    const saved = resource.key === "products"
      ? await saveAdminProduct(record)
      : resource.key === "shops" ? await saveAdminShop(record) : { ...record, id: record.id || `${resource.key}-${Date.now()}` };
    setRecords((current) => current.some((item) => item.id === saved.id)
      ? current.map((item) => item.id === saved.id ? saved : item)
      : [saved, ...current]);
    return saved;
  };

  const deleteRecord = async (id: string) => {
    if (resource.key === "products") await deleteAdminProduct(id);
    if (resource.key === "shops") await deleteAdminShop(id);
    setRecords((current) => current.filter((record) => record.id !== id));
  };

  return { records, setRecords, hydrated, storageError, saveRecord, deleteRecord };
}
