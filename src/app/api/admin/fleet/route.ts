import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";

export const runtime = "nodejs";
export const maxDuration = 60;

const FLEET_DIR = path.join(process.cwd(), "public", "images", "fleet");
const DATA_DIR = path.join(process.cwd(), "public", "data");
const FLEET_DATA_FILE = path.join(DATA_DIR, "fleet.json");

async function ensureDirs() {
  if (!existsSync(FLEET_DIR)) await mkdir(FLEET_DIR, { recursive: true });
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true });
}

async function readFleetData(): Promise<FleetItem[]> {
  try {
    const content = await readFile(FLEET_DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeFleetData(data: FleetItem[]) {
  await ensureDirs();
  await writeFile(FLEET_DATA_FILE, JSON.stringify(data, null, 2));
}

interface FleetItem {
  id: string;
  filename: string;
  tag: string;
  uploadedAt: string;
}

export async function GET() {
  const data = await readFleetData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    await ensureDirs();
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const tag = (formData.get("tag") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    const id = `fleet-${Date.now()}`;
    const filename = `${id}.webp`;
    const filepath = path.join(FLEET_DIR, filename);

    const buffer = Buffer.from(await file.arrayBuffer());

    await sharp(buffer)
      .webp({ quality: 85 })
      .toFile(filepath);

    const fleetData = await readFleetData();
    const newItem: FleetItem = { id, filename, tag, uploadedAt: new Date().toISOString() };
    fleetData.push(newItem);
    await writeFleetData(fleetData);

    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    console.error("Fleet upload error:", err);
    return NextResponse.json({ error: "Upload failed: " + (err as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const fleetData = await readFleetData();
    const item = fleetData.find((f) => f.id === id);

    if (item) {
      const filepath = path.join(FLEET_DIR, item.filename);
      if (existsSync(filepath)) await unlink(filepath);
      const updated = fleetData.filter((f) => f.id !== id);
      await writeFleetData(updated);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Fleet delete error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
