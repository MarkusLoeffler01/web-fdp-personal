"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const CATEGORIES = [
  { label: "Pressemitteilung", value: "PRESSEMITTEILUNG" },
  { label: "Beschluss", value: "BESCHLUSS" },
  { label: "Newsletter", value: "NEWSLETTER" },
  { label: "Allgemein", value: "ALLGEMEIN" },
];

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    title: "",
    teaser: "",
    category: "PRESSEMITTEILUNG",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  useEffect(() => {
    if (!id || !editor) return;
    fetch(`/api/posts/${id}`)
      .then((r) => r.json())
      .then((post) => {
        setForm({
          title: post.title ?? "",
          teaser: post.teaser ?? "",
          category: post.category ?? "ALLGEMEIN",
          published: post.published ?? false,
        });
        if (post.content) {
          editor.commands.setContent(post.content);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Beitrag konnte nicht geladen werden.");
        setLoading(false);
      });
  }, [id, editor]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSave(published: boolean) {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published,
          content: editor?.getHTML() ?? "",
        }),
      });
      if (res.ok) {
        router.push("/admin/posts");
      } else {
        const data = await res.json();
        setError(data.error ?? "Fehler beim Speichern.");
      }
    } catch {
      setError("Netzwerkfehler.");
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Beitrag wirklich löschen?")) return;
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      router.push("/admin/posts");
    } catch {
      setError("Fehler beim Löschen.");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "2px solid #E0E0E0",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
    outline: "none",
  };

  if (loading) {
    return (
      <div style={{ padding: "2.5rem", color: "rgba(0,0,0,0.45)" }}>
        Lade Beitrag …
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem", maxWidth: "880px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontWeight: 800, fontSize: "1.5rem" }}>
          Beitrag bearbeiten
        </h1>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            style={{
              padding: "0.5rem 1rem",
              border: "2px solid var(--magenta)",
              borderRadius: "4px",
              background: "transparent",
              color: "var(--magenta)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            Löschen
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="btn btn-outline"
            style={{ borderColor: "var(--black)", color: "var(--black)" }}
          >
            Als Entwurf speichern
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="btn btn-yellow"
          >
            {saving ? "Speichern …" : "Veröffentlichen"}
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#FFE8E8",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "1.5rem",
            color: "var(--magenta)",
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label
            htmlFor="title"
            style={{
              display: "block",
              fontWeight: 600,
              fontSize: "0.875rem",
              marginBottom: "0.4rem",
            }}
          >
            Titel *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleChange}
            style={{ ...inputStyle, fontSize: "1.15rem", fontWeight: 600 }}
            placeholder="Schlagkräftiger Titel"
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 200px",
            gap: "1.25rem",
          }}
        >
          <div>
            <label
              htmlFor="teaser"
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              Teaser *
            </label>
            <textarea
              id="teaser"
              name="teaser"
              required
              value={form.teaser}
              onChange={handleChange}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              placeholder="Kurze Zusammenfassung (erscheint in der Listenansicht)"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              style={{
                display: "block",
                fontWeight: 600,
                fontSize: "0.875rem",
                marginBottom: "0.4rem",
              }}
            >
              Kategorie
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              style={{ ...inputStyle, background: "white" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tiptap editor */}
        <div>
          <p
            style={{
              display: "block",
              fontWeight: 600,
              fontSize: "0.875rem",
              marginBottom: "0.75rem",
            }}
          >
            Inhalt
          </p>

          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              padding: "0.5rem 0.75rem",
              background: "var(--gray)",
              borderRadius: "4px 4px 0 0",
              border: "2px solid #E0E0E0",
              borderBottom: "none",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "B",
                action: () => editor?.chain().focus().toggleBold().run(),
                title: "Fett",
              },
              {
                label: "I",
                action: () => editor?.chain().focus().toggleItalic().run(),
                title: "Kursiv",
              },
              {
                label: "H2",
                action: () =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run(),
                title: "Überschrift",
              },
              {
                label: "UL",
                action: () =>
                  editor?.chain().focus().toggleBulletList().run(),
                title: "Liste",
              },
              {
                label: "OL",
                action: () =>
                  editor?.chain().focus().toggleOrderedList().run(),
                title: "Nummerierte Liste",
              },
              {
                label: "—",
                action: () =>
                  editor?.chain().focus().setHorizontalRule().run(),
                title: "Trennlinie",
              },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                onClick={btn.action}
                title={btn.title}
                style={{
                  padding: "0.25rem 0.6rem",
                  background: "var(--white)",
                  border: "1px solid #ddd",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div
            style={{
              border: "2px solid #E0E0E0",
              borderTop: "none",
              borderRadius: "0 0 4px 4px",
              minHeight: "300px",
              padding: "1rem",
              background: "var(--white)",
            }}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
