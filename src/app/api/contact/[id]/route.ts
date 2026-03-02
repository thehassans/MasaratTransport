import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
