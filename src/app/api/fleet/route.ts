import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const FLEET_DATA_FILE = path.join(process.cwd(), "public", "data", "fleet.json");

export async function GET() {
  try {
    const content = await readFile(FLEET_DATA_FILE, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json([]);
  }
}
