import { CheckCircle2, Circle, Zap } from "lucide-react";

export default function CTRMeter({ score }) {
  const color = score < 40 ? "#ef4444" : score < 65 ? "#f97316" : score < 85 ? "#facc15" : "#10b981";
  const label = score < 40 ? "Low Potential" : score < 65 ? "Average CTR" : score < 85 ? "Good Potential" : "Viral Potential 🔥";

  const checks = [
    { label: "High Contrast (Glow/Neon)", pass: score >= 30 },
    { label: "Depth of Field (Blur)", pass: score >= 50 },
    { label: "Dynamic Elements", pass: score >= 70 },
    { label: "Strong Subject Focus", pass: score >= 85 },
  ];

  return (
    <div className="card" style={{ marginTop: 12, padding: "12px 16px" }}>
      <div className="card-title" style={{ marginBottom: 8 }}>
        <Zap size={12} color={color} fill={color} /> Predicted CTR Score
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div style={{ fontSize: 24, lineHeight: 1, fontWeight: 700, fontFamily: "var(--font-display)", color, letterSpacing: 1, textShadow: `0 0 10px ${color}44` }}>
          {score}%
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </div>
      </div>

      <div style={{ height: 4, background: "var(--card2)", borderRadius: 2, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ 
          height: "100%", 
          width: `${score}%`, 
          background: color, 
          boxShadow: `0 0 8px ${color}`,
          transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease" 
        }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {checks.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 500, color: c.pass ? "var(--text)" : "var(--muted)", transition: "all 0.3s" }}>
            {c.pass ? <CheckCircle2 size={12} color={color} /> : <Circle size={12} color="var(--border)" />}
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
}