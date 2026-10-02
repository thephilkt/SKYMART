"use client";

import Link from "next/link";
import { Check, ChevronRight, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminCrudDialog, type DialogState } from "@/components/admin/admin-crud-dialog";
import { useAdminRecords } from "@/hooks/use-admin-records";
import { emptyAdminRecord, type AdminResource } from "@/lib/admin/resources";

const columnLabels: Record<string, string> = {
  display_name: "ชื่อ", email: "อีเมล", role: "บทบาท", status: "สถานะ", name: "ชื่อ", slug: "Slug", owner: "เจ้าของ",
  sort_order: "ลำดับ", is_active: "เปิดใช้งาน", shop: "ร้านค้า", category: "หมวดหมู่", sku: "SKU", product: "สินค้า",
  price: "ราคา", storage_path: "ไฟล์", is_primary: "ภาพหลัก", on_hand: "คงเหลือ", reserved: "จองแล้ว", reorder_point: "จุดสั่งเพิ่ม",
};

function cellValue(value: string | number | boolean, key: string) {
  if (typeof value === "boolean") return <span className={`admin-status ${value ? "is-active" : "is-muted"}`}><i />{value ? "ใช้งาน" : "ปิด"}</span>;
  if (key === "status") return <span className={`admin-status is-${String(value).toLowerCase()}`}><i />{String(value).replaceAll("_", " ")}</span>;
  if (key === "price") return `฿${Number(value).toLocaleString("th-TH")}`;
  return String(value);
}

export function AdminResourceWorkspace({ resource }: { resource: AdminResource }) {
  const { records, hydrated, storageError, saveRecord, deleteRecord } = useAdminRecords(resource);
  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [notice, setNotice] = useState("");
  const [actionError, setActionError] = useState("");
  const [saving, setSaving] = useState(false);
  const filtered = useMemo(() => records.filter((record) => Object.values(record).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))), [query, records]);

  const save = async () => {
    if (!dialog) return;
    setSaving(true);
    setActionError("");
    try {
      if (dialog.mode === "delete") await deleteRecord(dialog.record.id);
      else await saveRecord(dialog.record);
      setNotice(dialog.mode === "delete" ? "ลบข้อมูลแล้ว" : "บันทึกข้อมูลใน Supabase แล้ว");
      setDialog(null);
      window.setTimeout(() => setNotice(""), 2400);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "ทำรายการไม่สำเร็จ โปรดลองอีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-resource-page">
      <div className="admin-page-heading">
        <div><h1>{resource.label}</h1><p>{resource.description}</p></div>
        <div className="admin-heading-actions"><Link className="admin-button admin-button-secondary" href={`/admin/${resource.key}/new`}>เปิดแบบเต็มหน้า</Link><button className="admin-button admin-button-primary" onClick={() => setDialog({ mode: "create", record: emptyAdminRecord(resource) })}><Plus size={18} />เพิ่ม{resource.singular}</button></div>
      </div>

      <div className="admin-workbar">
        <label className="admin-search"><Search size={18} /><input aria-label={`ค้นหา${resource.label}`} onChange={(event) => setQuery(event.target.value)} placeholder={`ค้นหาใน${resource.label}`} value={query} /></label>
        <span>{hydrated ? `${filtered.length} รายการ · ${resource.key === "products" || resource.key === "shops" ? "Supabase" : "บันทึกในเบราว์เซอร์"}` : "กำลังโหลดข้อมูล…"}</span>
      </div>

      {storageError && <div className="admin-storage-error" role="alert">{storageError}</div>}
      {actionError && <div className="admin-storage-error" role="alert">{actionError}</div>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>{resource.columns.map((column) => <th key={column}>{columnLabels[column] ?? column}</th>)}<th><span className="sr-only">การทำงาน</span></th></tr></thead>
          <tbody>
            {filtered.map((record) => <tr key={record.id}>
              {resource.columns.map((column, index) => <td data-label={columnLabels[column] ?? column} key={column}>{index === 0 ? <Link className="admin-primary-cell" href={`/admin/${resource.key}/${record.id}`}>{cellValue(record[column], column)}<ChevronRight size={15} /></Link> : cellValue(record[column], column)}</td>)}
              <td className="admin-row-actions"><button aria-label={`แก้ไข ${String(record[resource.primaryField])}`} onClick={() => setDialog({ mode: "edit", record: { ...record } })}><Pencil size={17} /></button><button aria-label={`ลบ ${String(record[resource.primaryField])}`} onClick={() => setDialog({ mode: "delete", record: { ...record } })}><Trash2 size={17} /></button></td>
            </tr>)}
          </tbody>
        </table>
        {hydrated && !filtered.length && <div className="admin-empty"><Search size={28} /><h2>ไม่พบข้อมูลที่ค้นหา</h2><p>ลองใช้คำค้นที่สั้นลง หรือล้างคำค้นเพื่อดูข้อมูลทั้งหมด</p><button className="admin-button admin-button-secondary" onClick={() => setQuery("")}>ล้างคำค้น</button></div>}
      </div>
      {notice && <div className="admin-toast" role="status"><Check size={18} />{notice}</div>}
      <AdminCrudDialog busy={saving} error={actionError} resource={resource} state={dialog} onChange={(record) => setDialog(dialog ? { ...dialog, record } : null)} onClose={() => setDialog(null)} onConfirm={save} />
    </section>
  );
}
