import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server-utils";

function getSupabaseConfig() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL ??
    "";
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    "";

  if (!url || !key) {
    return {
      error:
        "Supabase ist nicht vollstaendig konfiguriert. Bitte URL und API-Key pruefen.",
    };
  }

  try {
    new URL(url);
  } catch {
    return {
      error:
        "Die konfigurierte Supabase-URL ist ungueltig. Bitte NEXT_PUBLIC_SUPABASE_URL pruefen.",
    };
  }

  return { url, key };
}

export async function POST(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  const config = getSupabaseConfig();
  if ("error" in config) {
    return NextResponse.json({ error: config.error }, { status: 500 });
  }

  const supabase = createClient(config.url, config.key);

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Keine Datei übermittelt." }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Nur JPEG, PNG, WebP und GIF sind erlaubt." },
      { status: 400 }
    );
  }

  // Validate file size (max 4 MB)
  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Maximal 4 MB erlaubt." }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("website-media")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from("website-media").getPublicUrl(path);

  return NextResponse.json({ url: data.publicUrl });
}
