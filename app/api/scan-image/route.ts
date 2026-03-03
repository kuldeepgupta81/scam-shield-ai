import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ result: "No file uploaded" });
    }

    // convert image to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    // ⚠️ Yaha abhi simple logic (fake AI)
    // baad me real AI connect karenge

    let result = "✅ Safe";

    if (base64.includes("otp") || base64.includes("bank")) {
      result = "⚠️ Suspicious";
    }

    return NextResponse.json({
      result,
    });
  } catch (err) {
    return NextResponse.json({
      result: "Error scanning image",
    });
  }
}