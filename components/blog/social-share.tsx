"use client";

import { useState, useEffect } from "react";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  title: string;
}

export function SocialShare({ title }: SocialShareProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy url: ", err);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <div className="flex flex-col gap-4 py-6 border-y border-slate-100 my-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Share this article
        </span>
        <div className="flex items-center gap-2">
          {/* Twitter / X */}
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Twitter / X"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-slate-200 hover:border-black hover:text-black transition-all hover:scale-105"
            >
              <Twitter className="w-4 h-4 fill-current" />
            </Button>
          </a>

          {/* Facebook */}
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on Facebook"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-all hover:scale-105"
            >
              <Facebook className="w-4 h-4 fill-current" />
            </Button>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on LinkedIn"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-slate-200 hover:border-blue-700 hover:text-blue-700 transition-all hover:scale-105"
            >
              <Linkedin className="w-4 h-4 fill-current" />
            </Button>
          </a>

          {/* WhatsApp */}
          <a
            href={shareLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="Share on WhatsApp"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full border-slate-200 hover:border-green-500 hover:text-green-500 transition-all hover:scale-105"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.727-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.449 5.4 0 9.794-4.394 9.797-9.797.002-2.617-1.015-5.078-2.868-6.93C16.35 2.022 13.89 1.002 11.277 1c-5.396 0-9.789 4.395-9.792 9.798-.001 1.57.425 3.102 1.233 4.47l-.994 3.63 3.738-.98c1.378.75 2.87 1.136 4.39 1.136zM17.15 14.77c-.3-.15-1.777-.878-2.052-.978-.276-.1-.477-.15-.677.15-.2.3-.777.978-.952 1.178-.176.2-.351.226-.651.076-.3-.15-1.267-.467-2.413-1.49-1.094-1.01-1.83-2.258-2.046-2.622-.216-.364-.023-.562.158-.742.162-.162.361-.422.541-.632.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.65-.09-.2-.677-1.63-.927-2.23-.244-.588-.492-.51-.677-.52l-.577-.01c-.2 0-.527.075-.803.376-.276.3-1.053 1.03-1.053 2.507s1.078 2.903 1.228 3.102c.15.2 2.122 3.24 5.141 4.545.718.31 1.278.496 1.715.635.722.23 1.379.197 1.9.12.58-.088 1.777-.727 2.027-1.43.25-.7.25-1.3.176-1.43-.076-.13-.276-.23-.576-.38z" />
              </svg>
            </Button>
          </a>

          {/* Divider line */}
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Copy Link */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className={`w-10 h-10 rounded-full border-slate-200 dark:border-slate-800 transition-all active:scale-90 hover:scale-105 ${
              copied
                ? "bg-green-50 border-green-200 text-green-600 hover:bg-green-950/30 hover:border-green-800"
                : "hover:border-purple-600 hover:text-purple-600 dark:hover:border-purple-400 dark:hover:text-purple-400"
            }`}
            title="Copy post link"
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
