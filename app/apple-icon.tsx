import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 96,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          К
        </div>
      </div>
    ),
    { ...size }
  );
}
