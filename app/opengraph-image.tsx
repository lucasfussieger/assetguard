import { ImageResponse } from "next/og";

export const alt =
  "Viz smart living: a água do prédio em tempo real e a gestão do condomínio no mesmo app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: "linear-gradient(135deg, #001b21 0%, #00333b 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>
              VIZ
            </span>
            <span
              style={{
                fontSize: 18,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#00b9bd",
              }}
            >
              smart living
            </span>
          </div>
          <div
            style={{
              marginTop: 48,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Veja a água do seu prédio em tempo real.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Reservatórios e hidrômetro monitorados, com a gestão do condomínio
            no mesmo app.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: 200,
            height: 380,
            borderRadius: 36,
            overflow: "hidden",
            background: "rgba(255,255,255,0.06)",
            border: "2px solid rgba(255,255,255,0.12)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "68%",
              background: "linear-gradient(0deg, #007e80 0%, #00b9bd 100%)",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
