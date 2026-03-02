import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = await Contact.create({ name, email, phone, company, service, message });
    return NextResponse.json({ success: true, id: contact._id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
