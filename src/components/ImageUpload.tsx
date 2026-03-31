import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_DIMENSION = 1000;

interface Props {
  /** Current preview — either a data-URL (new upload) or an existing remote URL */
  preview: string;
  /** Called with the resized blob + object-URL preview */
  onChange: (blob: Blob | null, previewUrl: string) => void;
}

/**
 * Resize an image using Canvas API, keeping aspect ratio,
 * capping width/height at MAX_DIMENSION.
 */
function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Canvas toBlob failed"))),
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

const ImageUpload = ({ preview, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = useCallback(
    async (file: File) => {
      // Format check
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: "格式不支援",
          description: "請提供網頁標準圖片格式（JPG, PNG, WebP）。",
          variant: "destructive",
        });
        return;
      }
      // Size check
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "檔案過大",
          description: "圖片大小不可超過 2MB，請壓縮後再試。",
          variant: "destructive",
        });
        if (inputRef.current) inputRef.current.value = "";
        return;
      }
      try {
        const resized = await resizeImage(file);
        const url = URL.createObjectURL(resized);
        onChange(resized, url);
      } catch {
        toast({ title: "圖片處理失敗", variant: "destructive" });
      }
    },
    [onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRemove = () => {
    onChange(null, "");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground mb-1.5 block">Image</label>

      {preview ? (
        <div className="relative rounded-md overflow-hidden border border-border h-40 bg-muted">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={handleRemove}
          >
            <X size={14} />
          </Button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed h-40 cursor-pointer transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-border bg-muted/40"
          }`}
        >
          <div className="rounded-full bg-muted p-3">
            {dragOver ? <ImageIcon size={22} className="text-primary" /> : <Upload size={22} className="text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground">點擊或拖放圖片上傳</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <p className="text-xs text-muted-foreground/70">
        支援 JPG, JPEG, PNG, WebP（最大 2MB）。Mac/iPhone 用戶請先將 HEIC 轉換為 JPG。
      </p>
    </div>
  );
};

export default ImageUpload;
