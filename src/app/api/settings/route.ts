import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    let settings = await SiteSettings.findOne({});
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
