import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
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
            top: -85,
            left: -85,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.4), rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 290,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          К
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
