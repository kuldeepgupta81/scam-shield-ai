import { NextResponse } from "next/server";

export async function POST(req: Request) {

const { url } = await req.json();

let result = "Safe";
let confidence = 20;
let reason = "No suspicious indicators";

if (url.includes("bit.ly") || url.includes("tinyurl")) {
result = "Suspicious";
confidence = 60;
reason = "Shortened URL detected";
}

if (url.includes("login") || url.includes("verify")) {
result = "Scam";
confidence = 80;
reason = "Phishing keywords detected";
}

return NextResponse.json({
result,
confidence,
reason
});

}
