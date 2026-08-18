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
          background:
            "linear-gradient(135deg, #3b82f6 0%, #2563eb 45%, #1e3a8a 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.4), rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 100,
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
