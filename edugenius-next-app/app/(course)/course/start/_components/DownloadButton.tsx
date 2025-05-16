import { Download } from "lucide-react";
import { useState } from "react";
interface DownloadButtonProps {
  filename: string;
  data: Blob;
}
export default function DownloadButton({
  filename,
  data,
}: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  };
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Preparing…" : <Download size={16} />} Download
    </button>
  );
}
