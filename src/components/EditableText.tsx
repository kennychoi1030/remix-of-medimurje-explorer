import { useState } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Pencil, Check, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
}

/**
 * Inline-editable text component for Admin mode.
 * Displays an edit icon on hover; clicking opens an inline input.
 * // TODO: Connect to Laravel API — PUT /api/content/:key
 */
const EditableText = ({ value, onChange, as: Tag = "span", className = "", style, multiline = false }: Props) => {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (!isAdmin) {
    return <Tag className={className} style={style}>{value}</Tag>;
  }

  if (editing) {
    return (
      <span className="inline-flex items-start gap-1.5 w-full">
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            autoFocus
            className="flex-1 rounded-md border border-primary bg-background px-2 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
          />
        ) : (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            className="flex-1 rounded-md border border-primary bg-background px-2 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        )}
        <button
          onClick={() => { onChange(draft); setEditing(false); }}
          className="p-1 rounded hover:bg-primary/10 text-primary"
        >
          <Check size={14} />
        </button>
        <button
          onClick={() => { setDraft(value); setEditing(false); }}
          className="p-1 rounded hover:bg-destructive/10 text-destructive"
        >
          <X size={14} />
        </button>
      </span>
    );
  }

  return (
    <Tag className={`${className} group/edit relative cursor-pointer`} style={style}>
      {value}
      <button
        onClick={() => { setDraft(value); setEditing(true); }}
        className="inline-flex ml-1.5 opacity-0 group-hover/edit:opacity-100 transition-opacity p-0.5 rounded hover:bg-primary/10 text-primary align-middle"
        aria-label="Edit text"
      >
        <Pencil size={12} />
      </button>
    </Tag>
  );
};

export default EditableText;
