import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
