import { Toggle, GlowPicker } from "../ui/Primitives";
import BgUpload from "../ui/BgUpload";
import { Sliders, Type, Image as ImageIcon, Sparkles, Square, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { PRESET_EXPR, SCENES } from "../../constants";

export default function PropertiesPanel({ layer, updateLayer }) {
  if (!layer) {
    return (
      <div className="panel-column">
        <div className="card" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 13 }}>
          Select a layer to edit properties.
        </div>
      </div>
    );
  }

  const upd = (key, val) => updateLayer(layer.id, { [key]: val });

  const getIcon = () => {
    if (layer.type === "image") return <ImageIcon size={14} />;
    if (layer.type === "text") return <Type size={14} />;
    if (layer.type === "background") return <Square size={14} />;
    if (layer.type === "effect") return <Sparkles size={14} />;
    return <Sliders size={14} />;
  };

  return (
    <div className="panel-column">
      <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="card-title">
          {getIcon()} {layer.type} Properties
        </div>
        
        <div style={{ overflowY: "auto", paddingRight: 4, flex: 1 }}>
          <div className="field">
            <div className="field-label">Layer Name</div>
            <input type="text" value={layer.name} onChange={e => upd("name", e.target.value)} />
          </div>

          <hr className="section-divider" />

          {/* COMMON TRANSFORM CONTROLS */}
          {(layer.type === "image" || layer.type === "text") && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <div className="field-label">Position X (%)</div>
                  <input type="number" value={layer.x} onChange={e => upd("x", Number(e.target.value))} />
                </div>
                <div className="field">
                  <div className="field-label">Position Y (%)</div>
                  <input type="number" value={layer.y} onChange={e => upd("y", Number(e.target.value))} />
                </div>
              </div>
              <div className="field">
                <div className="field-label">Opacity</div>
                <div className="overlay-row">
                  <input type="range" min="0" max="1" step="0.05" value={layer.opacity} onChange={e => upd("opacity", parseFloat(e.target.value))} />
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 36, textAlign: "right", color: "var(--text)" }}>{Math.round(layer.opacity * 100)}%</span>
                </div>
              </div>
              <hr className="section-divider" />
            </>
          )}

          {/* TEXT SPECIFIC */}
          {layer.type === "text" && (
            <>
              <div className="field">
                <div className="field-label">Text Content</div>
                <textarea value={layer.content} onChange={e => upd("content", e.target.value)} rows={3} style={{ resize: "vertical" }} />
              </div>
              <div className="field">
                <div className="field-label">Font Size</div>
                <div className="overlay-row">
                  <input type="range" min="10" max="300" step="1" value={layer.fontSize} onChange={e => upd("fontSize", Number(e.target.value))} />
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 36, textAlign: "right", color: "var(--text)" }}>{layer.fontSize}</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <div className="field-label">Text Color</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" value={layer.color} onChange={e => upd("color", e.target.value)} style={{ width: 32, height: 32, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }} />
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{layer.color}</span>
                  </div>
                </div>
                <div className="field">
                  <div className="field-label">Stroke</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input type="color" value={layer.stroke} onChange={e => upd("stroke", e.target.value)} style={{ width: 32, height: 32, padding: 0, border: "none", borderRadius: 4, cursor: "pointer" }} />
                  </div>
                </div>
              </div>
              <div className="toggle-row">
                <span className="toggle-label">Drop Shadow</span>
                <Toggle on={layer.shadow} fn={() => upd("shadow", !layer.shadow)} />
              </div>
            </>
          )}

          {/* IMAGE SPECIFIC */}
          {layer.type === "image" && (
            <>
              <div className="field">
                <div className="field-label">Image Source</div>
                <BgUpload imageUrl={layer.src} onImage={(url) => upd("src", url)} onClear={() => upd("src", null)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="field">
                  <div className="field-label">Width (px)</div>
                  <input type="number" value={layer.width} onChange={e => upd("width", Number(e.target.value))} />
                </div>
                <div className="field">
                  <div className="field-label">Height (px)</div>
                  <input type="number" value={layer.height} onChange={e => upd("height", Number(e.target.value))} />
                </div>
              </div>
              
              <div className="field">
                <div className="field-label">Quick Align</div>
                <div className="seg-control">
                  <button className="seg-btn" onClick={() => upd("x", 15)}><AlignLeft size={14}/> Left</button>
                  <button className="seg-btn" onClick={() => upd("x", 50)}><AlignCenter size={14}/> Center</button>
                  <button className="seg-btn" onClick={() => upd("x", 85)}><AlignRight size={14}/> Right</button>
                </div>
              </div>

              <div className="field">
                <div className="field-label">Expression Mode</div>
                <div className="seg-control">
                  <button className={`seg-btn ${!layer.useCustomExpression?"active":""}`} onClick={()=>upd("useCustomExpression", false)}>🎭 Preset</button>
                  <button className={`seg-btn ${layer.useCustomExpression?"active":""}`} onClick={()=>upd("useCustomExpression", true)}>✏️ Custom</button>
                </div>
              </div>

              {!layer.useCustomExpression ? (
                <div className="field">
                  <div className="seg-control">
                    {Object.entries(PRESET_EXPR).map(([k,v])=>(
                      <button key={k} className={`seg-btn ${layer.expression===k?"active":""}`} onClick={()=>upd("expression",k)} style={{textTransform:"capitalize"}}>
                        {v} {k}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="field">
                  <input
                    type="text"
                    value={layer.customExprText || ""}
                    onChange={e=>upd("customExprText", e.target.value)}
                    placeholder="e.g. villain smirk, battle cry"
                  />
                </div>
              )}

              <div className="field">
                <div className="field-label">Beautify Character</div>
                <div className="seg-control">
                  {["none","low","mid","high"].map(v => (
                    <button key={v} className={`seg-btn ${layer.beautify===v?"active":""}`} onClick={()=>upd("beautify", v)} style={{textTransform:"capitalize"}}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="toggle-row">
                <span className="toggle-label">Outer Glow</span>
                <Toggle on={layer.glow} fn={() => upd("glow", !layer.glow)} />
              </div>
              {layer.glow && (
                <div className="field" style={{ marginTop: 8 }}>
                  <div className="field-label">Glow Color</div>
                  <GlowPicker value={layer.glowColor} onChange={c => upd("glowColor", c)} />
                </div>
              )}
            </>
          )}

          {/* BACKGROUND SPECIFIC */}
          {layer.type === "background" && (
            <>
              <div className="field">
                <div className="field-label">Background Scene</div>
                <select value={layer.scene || "explosion"} onChange={e => upd("scene", e.target.value)}>
                  <option value="explosion">🔥 Explosion / Action</option>
                  <option value="battle">⚔️ Battle Arena</option>
                  <option value="neon_city">🌆 Neon City</option>
                  <option value="map">🗺️ Game Map</option>
                  <option value="galaxy">🌌 Galaxy / Epic</option>
                  <option value="custom">🖼️ Custom Image ✦</option>
                </select>
              </div>
              {layer.scene === "custom" && (
                <div className="field">
                  <div className="field-label">Custom Image</div>
                  <BgUpload imageUrl={layer.src} onImage={(url) => upd("src", url)} onClear={() => upd("src", null)} />
                </div>
              )}
              <div className="field">
                <div className="field-label">Darkness Overlay</div>
                <div className="overlay-row">
                  <input type="range" min="0" max="0.9" step="0.05" value={layer.brightness} onChange={e => upd("brightness", parseFloat(e.target.value))} />
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 36, textAlign: "right", color: "var(--text)" }}>{Math.round(layer.brightness * 100)}%</span>
                </div>
              </div>
              <div className="toggle-row">
                <span className="toggle-label">Depth Blur</span>
                <Toggle on={layer.blur} fn={() => upd("blur", !layer.blur)} />
              </div>
            </>
          )}

          {/* EFFECT SPECIFIC */}
          {layer.type === "effect" && (
            <>
              <div className="field">
                <div className="field-label">Effect Type</div>
                <select value={layer.effectType} onChange={e => upd("effectType", e.target.value)}>
                  <option value="vignette">Vignette (Dark Corners)</option>
                  <option value="particles">Particles (Sparks)</option>
                  <option value="neonBorder">Neon Border</option>
                </select>
              </div>
              {(layer.effectType === "particles" || layer.effectType === "neonBorder") && (
                <div className="field">
                  <div className="field-label">Effect Color</div>
                  <GlowPicker value={layer.color} onChange={c => upd("color", c)} />
                </div>
              )}
              <div className="field">
                <div className="field-label">Opacity</div>
                <div className="overlay-row">
                  <input type="range" min="0" max="1" step="0.05" value={layer.opacity} onChange={e => upd("opacity", parseFloat(e.target.value))} />
                  <span style={{ fontSize: 12, fontWeight: 600, minWidth: 36, textAlign: "right", color: "var(--text)" }}>{Math.round(layer.opacity * 100)}%</span>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
