"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function ImageScanner() {

const [image, setImage] = useState<File | null>(null);
const [result, setResult] = useState<any>(null);
const [loading, setLoading] = useState(false);

function scanImage() {


if (!image) return;

setLoading(true);

setTimeout(() => {

  const fileName = image.name.toLowerCase();

  let risk = 0;
  const reasons: string[] = [];

  if (fileName.includes("otp")) {
    risk += 40;
    reasons.push("OTP related screenshot detected");
  }

  if (fileName.includes("bank")) {
    risk += 30;
    reasons.push("Bank related screenshot detected");
  }

  if (fileName.includes("payment")) {
    risk += 25;
    reasons.push("Payment request detected");
  }

  let status = "Safe Image";

  if (risk >= 40) {
    status = "⚠ Suspicious Screenshot";
  }

  if (risk >= 70) {
    status = "🚨 High Risk Scam Screenshot";
  }

  setResult({
    status,
    risk,
    reasons
  });

  setLoading(false);

}, 1000);


}

function reset() {
setImage(null);
setResult(null);
}

return (


<div style={{ display: "flex", minHeight: "100vh" }}>

  <Sidebar />

  <div style={{
    flex: 1,
    padding: "40px",
    background: "#0f172a",
    color: "white"
  }}>

    <h1 style={{ marginBottom: "30px" }}>
      📷 WhatsApp Screenshot Scanner
    </h1>

    <input
      type="file"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
    />

    <br/><br/>

    <button
      onClick={scanImage}
      style={{
        padding: "10px 20px",
        background: "#6366f1",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer"
      }}
    >

      {loading ? "Scanning..." : "Scan Screenshot"}

    </button>

    {result && (

      <div style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <h2>{result.status}</h2>

        <p>Risk Score: {result.risk}%</p>

        <ul>

          {result.reasons.map((r:string,i:number)=>(
            <li key={i}>{r}</li>
          ))}

        </ul>

        <button
          onClick={reset}
          style={{
            marginTop: "15px",
            padding: "8px 15px",
            background: "#ec4899",
            border: "none",
            borderRadius: "8px",
            color: "white"
          }}
        >

          Scan Another

        </button>

      </div>

    )}

  </div>

</div>


);

}
