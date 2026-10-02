"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";
import type { AdminRecord, AdminResource } from "@/lib/admin/resources";
import { AdminRecordForm } from "@/components/admin/admin-record-form";

export type DialogState = { mode: "create" | "edit" | "delete"; record: AdminRecord } | null;

type Props = { state: DialogState; resource: AdminResource; busy?: boolean; error?: string; onChange: (record: AdminRecord) => void; onClose: () => void; onConfirm: () => void | Promise<void> };

export function AdminCrudDialog({ state, resource, busy = false, error = "", onChange, onClose, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (state && dialog && !dialog.open) dialog.showModal();
    if (!state && dialog?.open) dialog.close();
  }, [state]);

  if (!state) return null;
  const isDelete = state.mode === "delete";
  const title = isDelete ? `ลบ${resource.singular}` : state.mode === "create" ? `เพิ่ม${resource.singular}` : `แก้ไข${resource.singular}`;

  return (
    <dialog aria-labelledby="crud-dialog-title" className="admin-dialog" onCancel={(event) => { if (busy) event.preventDefault(); else onClose(); }} onClose={() => { if (!busy) onClose(); }} ref={dialogRef}>
      <form onSubmit={(event) => { event.preventDefault(); onConfirm(); }}>
        <header><div><h2 id="crud-dialog-title">{title}</h2><p>{isDelete ? "การดำเนินการนี้ไม่สามารถย้อนกลับได้" : "กรอกข้อมูลที่จำเป็นให้ครบก่อนบันทึก"}</p></div><button aria-label="ปิดหน้าต่าง" className="admin-icon-button" disabled={busy} onClick={onClose} type="button"><X /></button></header>
        <div className="admin-dialog-body">
          {error && <div className="admin-storage-error" role="alert">{error}</div>}
          {isDelete ? <div className="admin-delete-warning"><AlertTriangle size={24} /><div><strong>ยืนยันการลบ “{String(state.record[resource.primaryField])}”</strong><p>ข้อมูลที่เชื่อมโยงอาจได้รับผลกระทบ โปรดตรวจสอบก่อนดำเนินการ</p></div></div> : <AdminRecordForm resource={resource} value={state.record} onChange={onChange} />}
        </div>
        <footer><button className="admin-button admin-button-secondary" disabled={busy} onClick={onClose} type="button">ยกเลิก</button><button className={`admin-button ${isDelete ? "admin-button-danger" : "admin-button-primary"}`} disabled={busy} type="submit">{busy ? "กำลังบันทึก…" : isDelete ? "ยืนยันการลบ" : "บันทึกข้อมูล"}</button></footer>
      </form>
    </dialog>
  );
}
