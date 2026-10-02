"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminRecordForm } from "@/components/admin/admin-record-form";
import { AdminCrudDialog, type DialogState } from "@/components/admin/admin-crud-dialog";
import { useAdminRecords } from "@/hooks/use-admin-records";
import { emptyAdminRecord, type AdminRecord, type AdminResource } from "@/lib/admin/resources";

export function AdminFullPageForm({ resource, recordId }: { resource: AdminResource; recordId?: string }) {
  const isNew = !recordId;
  const router = useRouter();
  const { records, hydrated, storageError, saveRecord, deleteRecord } = useAdminRecords(resource);
  const storedRecord = recordId ? records.find((record) => record.id === recordId) : undefined;
  const [value, setValue] = useState<AdminRecord>(emptyAdminRecord(resource));
  const [saved, setSaved] = useState(false);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [deleted, setDeleted] = useState(false);
  const [actionError, setActionError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!storedRecord) return;
    const nextRecord = { ...storedRecord };
    queueMicrotask(() => setValue(nextRecord));
  }, [storedRecord]);

  if (!hydrated && recordId) {
    return <section className="admin-editor-page"><Link className="admin-back-link" href={`/admin/${resource.key}`}><ArrowLeft size={17} />กลับไป{resource.label}</Link><div className="admin-empty admin-editor-missing" aria-live="polite"><h1>กำลังโหลดข้อมูล…</h1><p>กำลังดึงข้อมูลล่าสุดจาก Supabase</p></div></section>;
  }

  if (hydrated && recordId && !storedRecord) {
    return <section className="admin-editor-page"><Link className="admin-back-link" href={`/admin/${resource.key}`}><ArrowLeft size={17} />กลับไป{resource.label}</Link><div className="admin-empty admin-editor-missing"><h1>ไม่พบรายการนี้</h1><p>รายการอาจถูกลบไปแล้ว หรือเปิดจากลิงก์ที่ไม่ถูกต้อง</p><Link className="admin-button admin-button-primary" href={`/admin/${resource.key}`}>กลับไปหน้ารายการ</Link></div></section>;
  }

  const submitRecord = async () => {
    setSaving(true);
    setActionError("");
    try {
      const nextRecord = await saveRecord(value);
      setValue(nextRecord);
      setSaved(true);
      window.setTimeout(() => router.push(`/admin/${resource.key}`), 700);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "บันทึกข้อมูลไม่สำเร็จ โปรดลองอีกครั้ง");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="admin-editor-page">
      <Link className="admin-back-link" href={`/admin/${resource.key}`}><ArrowLeft size={17} />กลับไป{resource.label}</Link>
      <div className="admin-page-heading"><div><h1>{isNew ? `เพิ่ม${resource.singular}` : String(value[resource.primaryField])}</h1><p>{isNew ? "สร้างรายการใหม่ด้วยแบบฟอร์มเต็มหน้า" : `รหัสรายการ ${value.id}`}</p></div><span className="admin-editor-state"><i />แบบร่างที่ยังไม่เผยแพร่</span></div>
      {storageError && <div className="admin-storage-error" role="alert">{storageError}</div>}
      {actionError && <div className="admin-storage-error" role="alert">{actionError}</div>}
      <form className="admin-editor-card" onSubmit={(event) => { event.preventDefault(); void submitRecord(); }}>
        <div className="admin-editor-intro"><h2>ข้อมูลหลัก</h2><p>ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอกก่อนบันทึก</p></div>
        <AdminRecordForm id="full-page" resource={resource} value={value} onChange={setValue} />
        <footer><div>{!isNew && <button className="admin-button admin-button-danger-quiet" disabled={saving} onClick={() => setDialog({ mode: "delete", record: { ...value } })} type="button"><Trash2 size={17} />ลบรายการ</button>}</div><div><Link className="admin-button admin-button-secondary" href={`/admin/${resource.key}`}>ยกเลิก</Link><button className="admin-button admin-button-primary" disabled={saving} type="submit"><Save size={17} />{saving ? "กำลังบันทึก…" : "บันทึกข้อมูล"}</button></div></footer>
      </form>
      {saved && <div className="admin-toast" role="status"><Check size={18} />บันทึกข้อมูลแล้ว</div>}
      {deleted && <div className="admin-toast" role="status"><Check size={18} />ลบข้อมูลแล้ว กำลังกลับไปหน้ารายการ</div>}
      <AdminCrudDialog busy={saving} error={actionError} resource={resource} state={dialog} onChange={(nextRecord) => setDialog(dialog ? { ...dialog, record: nextRecord } : null)} onClose={() => setDialog(null)} onConfirm={async () => { setSaving(true); setActionError(""); try { await deleteRecord(value.id); setDialog(null); setDeleted(true); window.setTimeout(() => router.push(`/admin/${resource.key}`), 700); } catch (error) { setActionError(error instanceof Error ? error.message : "ลบข้อมูลไม่สำเร็จ"); } finally { setSaving(false); } }} />
    </section>
  );
}
