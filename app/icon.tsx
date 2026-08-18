import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 7,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.4), rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 19,
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
