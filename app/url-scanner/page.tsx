"use client";

import Sidebar from "@/components/Sidebar";
import UrlScanner from "@/components/UrlScanner";

export default function UrlScannerPage() {

return (
<div style={{ display: "flex", minHeight: "100vh" }}>

  <Sidebar />

  <div
    style={{
      flex: 1,
      padding: "40px",
      background: "#0f172a"
    }}
  >

    <h1 style={{ color: "white", marginBottom: "30px" }}>
      URL Scam Scanner
    </h1>

    <UrlScanner />

  </div>

</div>


);

}
