"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DownloadButton({
  chapter_name,
  chapter,
}: {
  chapter_name: any;
  chapter: any;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const res = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapter, chapter_name }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `Chapter-${name}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);

    setLoading(false);
  };

  return (
    <Button onClick={handleDownload} disabled={loading} >
      {loading ? "Generating..." : "Download PDF"}
    </Button>
  );
}
