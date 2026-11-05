import { ImageResponse } from "next/og";
import { personalInfo } from "@/lib/constants";
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

const border = "#262626";

function Words({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "0.25em" }}>
      {text.split(/\s+/).map((word, index) => (
        <span key={index}>{word}</span>
      ))}
    </div>
  );
}

export async function renderOgImage({
  title,
  description,
  meta,
}: {
  title: string;
  description?: string;
  meta?: string;
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
        justifyContent: "space-between",
        padding: "72px 80px",
        fontFamily: "Inter",
        letterSpacing: "-0.02em",
      }}
    >
      <div style={{ display: "flex", gap: 14, fontSize: 28 }}>
        <span style={{ color: foreground }}>{personalInfo.name}</span>
        <span style={{ color: muted }}>{personalInfo.title}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 56 : title.length > 36 ? 64 : 76,
            color: foreground,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            maxWidth: 1000,
          }}
        >
          <Words text={title} />
        </div>
        {description ? (
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: muted,
              lineHeight: 1.4,
              maxWidth: 920,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${border}`,
          paddingTop: 28,
          fontSize: 26,
          color: muted,
        }}
      >
        <span>{meta ?? ""}</span>
        <span>{new URL(personalInfo.baseUrl).host}</span>
      </div>
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
    }
  );
}
