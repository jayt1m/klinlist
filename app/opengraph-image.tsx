import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "КлинЛист — медицинские калькуляторы для врачей";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 96,
              height: 96,
              borderRadius: 24,
              background:
                "linear-gradient(135deg, #3b82f6 0%, #2563eb 45%, #1e3a8a 100%)",
              color: "white",
              fontSize: 56,
              fontWeight: 700,
            }}
          >
            К
          </div>

          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, color: "#111827" }}>
            Клин<span style={{ color: "#2563eb" }}>Лист</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#4b5563",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Медицинские калькуляторы для врачей
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 24,
            color: "#2563eb",
            fontWeight: 600,
          }}
        >
          CHA₂DS₂-VASc · GRACE · SCORE2 · СКФ и другие
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
