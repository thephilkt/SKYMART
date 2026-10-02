import type { AdminRecord, AdminResource } from "@/lib/admin/resources";

type Props = {
  id?: string;
  resource: AdminResource;
  value: AdminRecord;
  onChange: (value: AdminRecord) => void;
};

export function AdminRecordForm({ id = "admin-record", resource, value, onChange }: Props) {
  const update = (key: string, nextValue: string | number | boolean) => onChange({ ...value, [key]: nextValue });

  return (
    <div className="admin-form-grid">
      {resource.fields.map((field) => (
        <label className={field.type === "textarea" ? "admin-field admin-field-wide" : "admin-field"} key={field.key}>
          <span>{field.label}{field.required && <em aria-hidden="true">*</em>}</span>
          {field.type === "select" ? (
            <select id={`${id}-${field.key}`} required={field.required} value={String(value[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)}>
              <option disabled value="">เลือก{field.label}</option>
              {field.options?.map((option) => <option key={option}>{option}</option>)}
            </select>
          ) : field.type === "textarea" ? (
            <textarea id={`${id}-${field.key}`} rows={4} value={String(value[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)} />
          ) : field.type === "boolean" ? (
            <span className="admin-switch"><input checked={Boolean(value[field.key])} id={`${id}-${field.key}`} type="checkbox" onChange={(event) => update(field.key, event.target.checked)} /><i aria-hidden="true" />{value[field.key] ? "เปิดใช้งาน" : "ปิดใช้งาน"}</span>
          ) : (
            <input id={`${id}-${field.key}`} required={field.required} type={field.type} value={String(value[field.key] ?? "")} onChange={(event) => update(field.key, field.type === "number" ? Number(event.target.value) : event.target.value)} />
          )}
        </label>
      ))}
    </div>
  );
}
