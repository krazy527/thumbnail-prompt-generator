import { useState, useRef, useEffect } from "react";
import { buildPrompt, calcCTR } from "./constants";
import CTRMeter from "./components/ui/CTRMeter";
import { CSS } from "./styles/css";
import ThumbnailPreview from "./components/thumbnail/ThumbnailPreview";
import LayerPanel from "./components/thumbnail/LayerPanel";
import PropertiesPanel from "./components/thumbnail/PropertiesPanel";
import { LayoutDashboard, Image as ImageIcon, BookOpen, Download, Upload, RotateCcw, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";

// Default layers for a new project
const DEFAULT_LAYERS = [
  {
    id: "bg-1", type: "background", name: "Main Background", visible: true,
    src: null, brightness: 0.5, blur: true, opacity: 1, zIndex: 0
  },
  {
    id: "effect-1", type: "effect", name: "Vignette", visible: true,
    effectType: "vignette", color: "#000000", opacity: 1, zIndex: 1
  },
  {
    id: "effect-2", type: "effect", name: "Particles", visible: true,
    effectType: "particles", color: "#ec4899", opacity: 1, zIndex: 2
  },
  {
    id: "image-1", type: "image", name: "Character Face", visible: true,
    src: null, x: 50, y: 50, width: 300, height: 300, opacity: 1, glow: true, glowColor: "#7c3aed", zIndex: 5
  },
  {
    id: "text-1", type: "text", name: "Main Title", visible: true,
    content: "INSANE\\nCLUTCH", color: "#ffffff", stroke: "#000000", shadow: true, x: 50, y: 80, fontSize: 100, opacity: 1, zIndex: 10
  }
];

export default function App() {
  const [sbOpen, setSbOpen] = useState(false);
  const [page, setPage]     = useState("thumbnail");
  const [toast, setToast]   = useState(null);
  const toastRef            = useRef(null);

  const [profile, setProfile] = useState(()=>{
    try{return JSON.parse(localStorage.getItem("tgen_profile"))||{};}catch{return {};}
  });
  const prf = {channelName:"DRONE AISHU GAMING",characterName:"AISHU",channelUrl:"",...profile};

  const [layers, setLayers] = useState(() => {
    try {
      const saved = localStorage.getItem("tgen_layers");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_LAYERS;
  });
  const [activeLayerId, setActiveLayerId] = useState(layers[0]?.id || null);

  const [projectSettings, setProjectSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("tgen_settings");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { layoutType: "single" };
  });

  useEffect(() => {
    localStorage.setItem("tgen_layers", JSON.stringify(layers));
    localStorage.setItem("tgen_settings", JSON.stringify(projectSettings));
  }, [layers, projectSettings]);

  const showToast = msg => {
    clearTimeout(toastRef.current);
    setToast(msg);
    toastRef.current = setTimeout(()=>setToast(null),2200);
  };

  const updateLayer = (id, updates) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const prompt = buildPrompt(layers, prf, projectSettings);
  const ctr    = calcCTR(layers, projectSettings);
  const activeLayer = layers.find(l => l.id === activeLayerId);

  const NAV = [
    {id:"thumbnail", icon: <ImageIcon size={20} />, label:"Thumbnail"},
    {id:"dashboard", icon: <LayoutDashboard size={20} />, label:"Profile"},
    {id:"guide",     icon: <BookOpen size={20} />, label:"Guide"},
  ];

  const handleExport = () => {
    const data = { profile, layers };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "thumbnail-preset.json";
    a.click();
    showToast("✅ Preset exported!");
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.layers) setLayers(data.layers);
        if (data.profile) setProfile(data.profile);
        showToast("✅ Preset imported!");
      } catch (err) {
        showToast("❌ Invalid JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = null;
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* SIDEBAR */}
        <div className={`sidebar ${sbOpen?"open":""}`}>
          <div className="sidebar-logo">
            {sbOpen ? <span>TGEN</span> : "T"}
          </div>
          {NAV.map(n=>(
            <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              {sbOpen && <span>{n.label}</span>}
            </div>
          ))}
          <button className="toggle-btn" onClick={()=>setSbOpen(x=>!x)}>
            {sbOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <div className="main">
          {/* ══════════ THUMBNAIL PAGE ══════════ */}
          {page==="thumbnail" && (
            <>
              <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <div>
                  <div className="page-title">THUMBNAIL ENGINE</div>
                  <div className="page-sub">Layer-based builder & Smart Prompt generator</div>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--card2)", padding: "4px 8px", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", paddingLeft: 8 }}>Layout:</span>
                  <div className="seg-control" style={{ border: "none", background: "transparent" }}>
                    {["single","dual","multi"].map(v => (
                      <button key={v} className={`seg-btn ${projectSettings.layoutType===v?"active":""}`} onClick={()=>setProjectSettings({layoutType: v})} style={{ textTransform: "capitalize", padding: "4px 10px" }}>{v}</button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn btn-ghost" onClick={() => document.getElementById('import-json').click()}>
                    <Upload size={16} /> Import
                  </button>
                  <input type="file" id="import-json" style={{ display: "none" }} accept=".json" onChange={handleImport} />
                  <button className="btn btn-ghost" onClick={handleExport}>
                    <Download size={16} /> Export Preset
                  </button>
                  <button className="btn btn-primary" onClick={() => { setLayers(DEFAULT_LAYERS); showToast("🔄 Workspace Reset"); }}>
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>

              <div className="tgen-grid">
                {/* LEFT COLUMN: SCROLLABLE */}
                <LayerPanel 
                  layers={layers} 
                  setLayers={setLayers} 
                  activeLayerId={activeLayerId} 
                  setActiveLayerId={setActiveLayerId} 
                />

                {/* CENTER COLUMN: CANVAS + PROMPT */}
                <div className="center-column">
                  <div className="preview-wrap">
                    <ThumbnailPreview layers={layers} prf={prf}/>
                    <CTRMeter score={ctr}/>
                  </div>

                  <div className="card" style={{ flexShrink: 0 }}>
                    <div className="card-title">Smart AI Prompt Output</div>
                    <div className="prompt-box">
                      {prompt.split("\\n").map((line,i)=>{
                        if (!line.trim()) return <br key={i}/>;
                        return (
                          <div key={i}>
                            {line.split(/(\*\*[^*]+\*\*)/g).map((p,j)=>
                              p.startsWith("**")&&p.endsWith("**")
                                ? <span key={j} className="kw">{p.slice(2,-2)}</span>
                                : <span key={j}>{p}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{marginTop:16}}>
                      <button className="btn btn-primary" onClick={()=>{
                        navigator.clipboard.writeText(prompt.replace(/\\*\\*/g,"")).then(()=>showToast("✅ Prompt copied!"));
                      }}><Copy size={16} /> Copy Full Prompt</button>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: SCROLLABLE */}
                <PropertiesPanel 
                  layer={activeLayer} 
                  updateLayer={updateLayer} 
                />
              </div>
            </>
          )}

          {/* ══════════ PROFILE PAGE ══════════ */}
          {page==="dashboard" && (
            <>
              <div className="page-header">
                <div className="page-title">CHANNEL PROFILE</div>
                <div className="page-sub">Used across all prompts and branding elements</div>
              </div>
              <div style={{maxWidth:600}}>
                <div className="card">
                  <div className="card-title">Profile Setup</div>
                  {[
                    {key:"channelName",  label:"Channel Name",     ph:"DRONE AISHU GAMING"},
                    {key:"characterName",label:"Character / Alias", ph:"AISHU"},
                    {key:"channelUrl",   label:"Channel URL",       ph:"youtube.com/@..."},
                  ].map(f=>(
                    <div key={f.key} className="field">
                      <div className="field-label">{f.label}</div>
                      <input type="text" value={profile[f.key]||""} placeholder={f.ph}
                        onChange={e=>setProfile(p=>({...p,[f.key]:e.target.value}))}/>
                    </div>
                  ))}
                  <button className="btn btn-primary" style={{marginTop:16}} onClick={()=>{
                    localStorage.setItem("tgen_profile",JSON.stringify(profile));
                    showToast("✅ Profile saved!");
                  }}><Check size={16} /> Save Profile</button>
                </div>
              </div>
            </>
          )}

          {/* ══════════ GUIDE PAGE ══════════ */}
          {page==="guide" && (
            <>
              <div className="page-header">
                <div className="page-title">PROMPT GUIDE</div>
                <div className="page-sub">Turn generated prompts into real thumbnails</div>
              </div>
              <div style={{maxWidth:720,display:"flex",flexDirection:"column",gap:20}}>
                {[
                  {title:"AI Tools to use",content:[
                    "🎨 Midjourney — Best cinematic quality. /imagine [prompt] --ar 16:9 --v 6",
                    "🖼 Leonardo AI — Free tier. Use 'Lightning XL' model.",
                    "💬 ChatGPT DALL·E 3 — Paste short prompt. Say '16:9 YouTube gaming thumbnail'.",
                  ]}
                ].map((sec,i)=>(
                  <div key={i} className="card">
                    <div className="card-title">{sec.title}</div>
                    {sec.content.map((c,j)=>(
                      <div key={j} style={{padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:14,lineHeight:1.6,color:"var(--text)"}}>{c}</div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {toast && (
        <div style={{
          position:"fixed", bottom:24, right:24, zIndex:9999,
          background:"var(--card)", color:"var(--text)", padding:"12px 20px",
          borderRadius:8, border:"1px solid var(--border-focus)",
          boxShadow:"0 8px 32px var(--glow-p)", display:"flex", alignItems:"center", gap:10,
          fontFamily:"var(--font-sans)", fontSize:14, fontWeight:500
        }}>
          {toast}
        </div>
      )}
    </>
  );
}