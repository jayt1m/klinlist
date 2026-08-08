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
          background: "#2563eb",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 104,
            fontWeight: 800,
            fontFamily: "sans-serif",
          }}
        >
          К
        </div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
