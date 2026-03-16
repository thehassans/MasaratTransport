import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ffmpegPath: string = require("ffmpeg-static");

export const runtime = "nodejs";
export const maxDuration = 300;

const execFileAsync = promisify(execFile);
const VIDEOS_DIR = path.join(process.cwd(), "public", "videos");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

export async function POST(req: NextRequest) {
  let tmpInput = "";
  try {
    const formData = await req.formData();
    const file = formData.get("video") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    const ext = path.extname(file.name) || ".mp4";
    tmpInput = path.join(VIDEOS_DIR, `tmp-input-${Date.now()}${ext}`);
    const outputPath = path.join(VIDEOS_DIR, "hero.webm");
    const posterPath = path.join(IMAGES_DIR, "hero-poster.webp");

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(tmpInput, buffer);

    await execFileAsync(ffmpegPath, [
      "-i", tmpInput,
      "-c:v", "libvpx-vp9",
      "-crf", "33",
      "-b:v", "0",
      "-deadline", "realtime",
      "-cpu-used", "5",
      "-c:a", "libopus",
      "-b:a", "128k",
      "-y",
      outputPath,
    ]);

    try {
      await execFileAsync(ffmpegPath, [
        "-i", outputPath,
        "-vframes", "1",
        "-vf", "scale=1920:-1",
        "-y",
        posterPath,
      ]);
    } catch {
      // poster is optional
    }

    if (existsSync(tmpInput)) await unlink(tmpInput);

    return NextResponse.json({ success: true, message: "Banner video converted and updated successfully" });
  } catch (err) {
    console.error("Banner upload error:", err);
    if (tmpInput && existsSync(tmpInput)) {
      try { await unlink(tmpInput); } catch { /* ignore */ }
    }
    return NextResponse.json({ error: "Conversion failed: " + (err as Error).message }, { status: 500 });
  }
}
