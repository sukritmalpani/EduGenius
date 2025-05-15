interface DownloadButtonProps {
  filename: string;
  data: Blob;
}

export default function DownloadButton({
  filename,
  data,
}: DownloadButtonProps) {
  return <button>Download {filename}</button>;
}
