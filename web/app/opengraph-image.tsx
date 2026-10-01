import { ImageResponse } from "next/og";
import { SCHOOL } from "@/lib/brand/school";

export const alt = `${SCHOOL.name} — ${SCHOOL.motto}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The social share card.
 *
 * Inky Blue ground with Yellow Banana — the pairing the guidelines name as
 * first choice. Text is white on Inky Blue (12.72:1), never gold on white.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#023266",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 26, height: 26, borderRadius: 999, background: "#F1A719", display: "flex",
            }}
          />
          <div
            style={{
              color: "#F1A719",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Daycare · Kindergarten · Primary
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {SCHOOL.name}
          </div>
          <div style={{ color: "#F1A719", fontSize: 38, marginTop: 24, display: "flex" }}>
            {SCHOOL.motto}
          </div>
        </div>

        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 26, display: "flex" }}>
          Kasangati–Namugongo Road, Kiira Town, Kampala
        </div>
      </div>
    ),
    size,
  );
}
