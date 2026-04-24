import { Layers, Image as ImageIcon, Type, Square, Sparkles, Eye, EyeOff, ChevronUp, ChevronDown, X, Plus } from "lucide-react";

export default function LayerPanel({ layers, setLayers, activeLayerId, setActiveLayerId }) {
  const addLayer = (type) => {
    const newLayer = {
      id: `${type}-${Date.now()}`,
      type,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      visible: true,
      x: 50,
      y: 50,
      opacity: 1,
      ...(type === "text" && {
        content: "NEW TEXT", color: "#ffffff", stroke: "#000000", shadow: true, fontSize: 100,
      }),
      ...(type === "image" && {
        src: null, width: 300, height: 300, glow: false, glowColor: "#7c3aed",
      }),
      ...(type === "background" && {
        src: null, brightness: 0.5, blur: false,
      }),
      ...(type === "effect" && {
        effectType: "vignette", color: "#7c3aed",
      }),
    };
    setLayers((prev) => [newLayer, ...prev]);
    setActiveLayerId(newLayer.id);
  };

  const removeLayer = (id, e) => {
    e.stopPropagation();
    setLayers((prev) => prev.filter((l) => l.id !== id));
    if (activeLayerId === id) setActiveLayerId(null);
  };

  const toggleVisibility = (id, e) => {
    e.stopPropagation();
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  };

  const moveLayer = (index, dir) => {
    setLayers((prev) => {
      const newLayers = [...prev];
      if (dir === "up" && index > 0) {
        [newLayers[index - 1], newLayers[index]] = [newLayers[index], newLayers[index - 1]];
      } else if (dir === "down" && index < newLayers.length - 1) {
        [newLayers[index + 1], newLayers[index]] = [newLayers[index], newLayers[index + 1]];
      }
      return newLayers;
    });
  };

  const getIcon = (type) => {
    if (type === "image") return <ImageIcon size={16} />;
    if (type === "text") return <Type size={16} />;
    if (type === "background") return <Square size={16} />;
    if (type === "effect") return <Sparkles size={16} />;
    return <Layers size={16} />;
  };

  return (
    <div className="panel-column">
      <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="card-title">
          <Layers size={14} /> Layer Stack
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          <button className="btn btn-ghost" onClick={() => addLayer("image")}><ImageIcon size={14}/> Image</button>
          <button className="btn btn-ghost" onClick={() => addLayer("text")}><Type size={14}/> Text</button>
          <button className="btn btn-ghost" onClick={() => addLayer("background")}><Square size={14}/> BG</button>
          <button className="btn btn-ghost" onClick={() => addLayer("effect")}><Sparkles size={14}/> Effect</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, paddingRight: 4 }}>
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className={`layer-item ${activeLayerId === layer.id ? "active" : ""}`}
              onClick={() => setActiveLayerId(layer.id)}
            >
              <button
                className="btn-icon"
                style={{ padding: 4, color: layer.visible ? "var(--text)" : "var(--muted)" }}
                onClick={(e) => toggleVisibility(layer.id, e)}
              >
                {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              
              <div className="layer-type-icon">{getIcon(layer.type)}</div>
              
              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {layer.name}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  className="btn-icon" style={{ padding: 2 }}
                  onClick={(e) => { e.stopPropagation(); moveLayer(index, "up"); }}
                  disabled={index === 0}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  className="btn-icon" style={{ padding: 2 }}
                  onClick={(e) => { e.stopPropagation(); moveLayer(index, "down"); }}
                  disabled={index === layers.length - 1}
                >
                  <ChevronDown size={14} />
                </button>
              </div>

              <button
                className="btn-icon"
                style={{ padding: 4, color: "var(--pink)" }}
                onClick={(e) => removeLayer(layer.id, e)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {layers.length === 0 && (
            <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
              No layers. Add one to start building.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
