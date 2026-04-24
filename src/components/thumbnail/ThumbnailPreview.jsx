import { SCENES, PRESET_EXPR } from "../../constants";

export default function ThumbnailPreview({ layers }) {
  // We want to render the bottom layers first. 
  // If layers are ordered top-to-bottom in the UI list, we should reverse them for rendering.
  const renderLayers = [...layers].reverse();

  return (
    <div className="thumb-canvas" style={{ background: "#0a0a14" }}>
      {renderLayers.map((layer) => {
        if (!layer.visible) return null;

        // BACKGROUND LAYER
        if (layer.type === "background") {
          return (
            <div key={layer.id} style={{ position: "absolute", inset: 0, zIndex: 1, opacity: layer.opacity }}>
              {layer.src ? (
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${layer.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: layer.blur ? "blur(4px)" : "none",
                  transform: layer.blur ? "scale(1.05)" : "scale(1)", // prevent blur edge bleed
                }} />
              ) : (
                <div style={{ 
                  position: "absolute", inset: 0, 
                  background: (SCENES[layer.scene || "explosion"] || SCENES.explosion).bg 
                }} />
              )}
              {/* Darkness overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `rgba(0,0,0,${layer.brightness ?? 0})`,
                pointerEvents: "none"
              }} />
            </div>
          );
        }

        // IMAGE LAYER
        if (layer.type === "image") {
          return (
            <div key={layer.id} style={{
              position: "absolute",
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: "translate(-50%, -50%)",
              width: layer.width,
              height: layer.height,
              zIndex: 5,
              opacity: layer.opacity,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {layer.src ? (
                <img 
                  src={layer.src} 
                  alt={layer.name}
                  style={{
                    width: "100%", 
                    height: "100%", 
                    objectFit: "contain",
                    filter: layer.glow ? `drop-shadow(0 0 ${layer.width * 0.08}px ${layer.glowColor})` : "none"
                  }} 
                />
              ) : (
                <div style={{
                  width: "100%", height: "100%", 
                  background: `radial-gradient(circle, ${layer.glowColor || "#7c3aed"}33, #1a1a1a)`,
                  border: layer.glow ? `2px solid ${layer.glowColor}` : "2px solid rgba(255,255,255,.1)",
                  boxShadow: layer.glow ? `0 0 20px ${layer.glowColor}, 0 0 40px ${layer.glowColor}44, inset 0 0 20px ${layer.glowColor}22` : "none",
                  borderRadius: "50%",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  color: "#fff"
                }}>
                  <div style={{ fontSize: layer.width * 0.35 }}>
                    {layer.useCustomExpression ? "🎭" : (PRESET_EXPR[layer.expression] || "🖼️")}
                  </div>
                  {layer.beautify && layer.beautify !== "none" && (
                    <div style={{ fontSize: layer.width * 0.1, color: "var(--pink)", fontWeight: 700, marginTop: 4 }}>
                      ✦ Beautify {layer.beautify}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        }

        // TEXT LAYER
        if (layer.type === "text") {
          return (
            <div key={layer.id} style={{
              position: "absolute",
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              opacity: layer.opacity,
              color: layer.color,
              fontSize: `${layer.fontSize}px`,
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "3px",
              WebkitTextStroke: layer.stroke !== "transparent" ? `2px ${layer.stroke}` : "none",
              textShadow: layer.shadow ? `4px 4px 0 rgba(0,0,0,0.8), 0 0 20px ${layer.color}` : "none",
              textAlign: "center",
              whiteSpace: "pre-wrap",
              lineHeight: 1.2
            }}>
              {layer.content || "TEXT"}
            </div>
          );
        }

        // EFFECT LAYER
        if (layer.type === "effect") {
          if (layer.effectType === "vignette") {
            return <div key={layer.id} style={{
              position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none", opacity: layer.opacity,
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)"
            }} />;
          }
          if (layer.effectType === "neonBorder") {
            return <div key={layer.id} style={{
              position: "absolute", inset: 0, zIndex: 15, pointerEvents: "none", opacity: layer.opacity,
              boxShadow: `inset 0 0 0 4px ${layer.color}, inset 0 0 30px ${layer.color}88`,
              borderRadius: "10px"
            }} />;
          }
          if (layer.effectType === "particles") {
             // Generate static particles for preview purely using CSS
             const particles = Array.from({length: 12}).map((_, i) => ({
               x: Math.floor((i * 137.5) % 100),
               y: Math.floor((i * 97.3) % 100),
               size: (i % 3) + 4
             }));
             return (
               <div key={layer.id} style={{ position: "absolute", inset: 0, zIndex: 14, pointerEvents: "none", opacity: layer.opacity }}>
                 {particles.map((p, i) => (
                   <div key={i} style={{
                     position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
                     width: p.size, height: p.size, borderRadius: "50%",
                     background: layer.color, boxShadow: `0 0 ${p.size*2}px ${layer.color}`
                   }} />
                 ))}
               </div>
             );
          }
        }

        return null;
      })}
    </div>
  );
}