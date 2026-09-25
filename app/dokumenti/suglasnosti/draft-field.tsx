export function DraftField({ label, id, type = "text" }: { label: string; id: string; type?: "text" | "date" }) {
  return <label className="draft-field" htmlFor={id}><span>{label}</span><input id={id} name={id} type={type} maxLength={500} autoComplete="off" placeholder={type === "text" ? "Upiši ovdje" : undefined}/></label>;
}
