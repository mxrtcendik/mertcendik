import { ImageResponse } from "next/og";
import { ogFontBase64 } from "@/lib/og-font";

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

const background = "#0a0a0a";
const foreground = "#fafafa";
const muted = "#a3a3a3";

function loadOgFont() {
  const binary = atob(ogFontBase64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes.buffer;
}

export async function renderOgImage({
  title,
  detail,
}: {
  title: string;
  detail?: string;
}) {
  const font = loadOgFont();

  return new ImageResponse(
    <div
      style={{
        background,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "80px",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: title.length > 42 ? 64 : 80,
          fontWeight: 600,
          color: foreground,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      {detail ? (
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 32,
            fontWeight: 600,
            color: muted,
            letterSpacing: "-0.02em",
          }}
        >
          {detail}
        </div>
      ) : null}
    </div>,
    {
      ...ogSize,
      fonts: [
        {
          name: "Inter",
          data: font,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
