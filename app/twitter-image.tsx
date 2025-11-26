import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mert Cendik";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const interSemiBold = await fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.8/files/inter-latin-600-normal.woff"
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch font");
    return res.arrayBuffer();
  });

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(150deg, #FFD1FF 0%, #FAD0C4 30%, #D4D3FF 65%, #C2E9FB 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 100,
            fontWeight: 600,
            color: "black",
            fontFamily: "Inter",
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          Mert Cendik
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: interSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
