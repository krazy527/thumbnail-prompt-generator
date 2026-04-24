export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bebas+Neue&family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#050508;
  --surface:#0a0a10;
  --card:#0f0f18;
  --card2:#151522;
  --border:rgba(255,255,255,0.08);
  --border-focus:rgba(124,58,237,0.4);
  --purple:#7c3aed;
  --purple2:#a855f7;
  --pink:#ec4899;
  --orange:#f97316;
  --cyan:#06b6d4;
  --yellow:#facc15;
  --green:#10b981;
  --text:#f8fafc;
  --muted:#94a3b8;
  --glow-p:rgba(124,58,237,0.45);
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Bebas Neue', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
body{background:var(--bg);color:var(--text);font-family:var(--font-sans);overflow-x:hidden;}
::-webkit-scrollbar{width:6px;height:6px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:10px;}
::-webkit-scrollbar-thumb:hover{background:rgba(255,255,255,0.2);}

.app{display:flex;height:100vh;overflow:hidden;}

/* SIDEBAR */
.sidebar{width:48px;background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:24px 0;gap:12px;position:relative;transition:width .3s cubic-bezier(.4,0,.2,1);flex-shrink:0;z-index:50;}
.sidebar.open{width:220px;align-items:flex-start;padding:24px 16px;}
.sidebar-logo{font-family:var(--font-display);font-size:24px;letter-spacing:2px;color:var(--text);margin-bottom:24px;display:flex;align-items:center;justify-content:center;width:100%;}
.sidebar-logo span{color:var(--purple2);}
.nav-item{display:flex;align-items:center;gap:12px;width:100%;padding:12px;border-radius:10px;cursor:pointer;color:var(--muted);font-size:14px;font-weight:500;transition:all .2s;}
.nav-item:hover{background:rgba(255,255,255,0.03);color:var(--text);}
.nav-item.active{background:rgba(124,58,237,.15);color:var(--purple2);border:1px solid rgba(124,58,237,.3);}
.nav-icon{display:flex;align-items:center;justify-content:center;}
.toggle-btn{margin-top:auto;background:none;border:1px solid var(--border);color:var(--muted);cursor:pointer;padding:8px;border-radius:8px;transition:all .2s;}
.toggle-btn:hover{color:var(--text);border-color:var(--muted);}

/* MAIN CONTENT */
.main{flex:1;display:flex;flex-direction:column;overflow:hidden;padding:24px 32px;}
.page-header{margin-bottom:24px;flex-shrink:0;}
.page-title{font-family:var(--font-sans);font-size:24px;font-weight:700;letter-spacing:-0.5px;color:var(--text);display:flex;align-items:center;gap:10px;}
.page-sub{color:var(--muted);font-size:14px;margin-top:6px;}

/* 3-COLUMN GRID */
.tgen-grid{display:grid;grid-template-columns:340px 1fr 380px;gap:24px;flex:1;min-height:0;overflow:hidden;}
@media(max-width:1200px){.tgen-grid{grid-template-columns:300px 1fr 320px;}}
@media(max-width:992px){.tgen-grid{grid-template-columns:1fr;overflow-y:auto;}}

/* PANELS */
.panel-column{display:flex;flex-direction:column;gap:16px;height:100%;overflow-y:auto;padding-right:8px;}
.center-column{display:flex;flex-direction:column;gap:16px;height:100%;overflow-y:auto;}

.card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;position:relative;}
.card-title{font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:16px;display:flex;align-items:center;gap:8px;}
.section-divider{border:none;border-top:1px solid var(--border);margin:16px 0;}
.color-row {display: flex; align-items: center; justify-content: space-between;  gap: 5px }
/* FORMS */
.field{margin-bottom:16px;}
.field-label{display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:500;color:var(--muted);margin-bottom:8px;}
input[type=text],input[type=number],textarea,select{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:10px 14px;color:var(--text);font-family:var(--font-sans);font-size:13px;outline:none;transition:all .2s;}
input:focus,textarea:focus,select:focus{border-color:var(--border-focus);box-shadow:0 0 0 3px rgba(124,58,237,.1);}
select{appearance:none;background-image:url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");background-repeat:no-repeat;background-position:right 12px center;background-size:16px;}
select option{background:var(--card);}

.seg-control{display:flex;gap:4px;background:var(--card2);border-radius:8px;padding:4px;border:1px solid var(--border);}
.seg-btn{flex:1;padding:8px;border-radius:6px;border:none;background:none;color:var(--muted);cursor:pointer;font-size:12px;font-weight:500;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;}
.seg-btn:hover{color:var(--text);}
.seg-btn.active{background:var(--card);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.3);}

.toggle-row{display:flex;align-items:center;justify-content:space-between;padding:8px 0;}
.toggle-label{font-size:13px;font-weight:500;color:var(--text);display:flex;align-items:center;gap:8px;}

/* BUTTONS */
.btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 16px;border-radius:8px;cursor:pointer;font-size:13px;font-weight:500;transition:all .2s;border:none;}
.btn-primary{background:var(--purple);color:#fff;}
.btn-primary:hover{background:var(--purple2);}
.btn-ghost{background:var(--card2);border:1px solid var(--border);color:var(--text);}
.btn-ghost:hover{background:rgba(255,255,255,0.05);}
.btn-icon{padding:6px;background:none;border:none;color:var(--muted);cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.btn-icon:hover{background:rgba(255,255,255,0.1);color:var(--text);}

/* CANVAS */
.preview-wrap{display:flex;flex-direction:column;gap:12px;}
.thumb-canvas{width:100%;aspect-ratio:16/9;border-radius:8px;position:relative;overflow:hidden;border:1px solid var(--border);background:#000;box-shadow:0 10px 40px rgba(0,0,0,0.5);}

/* PROMPT BOX */
.prompt-box{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:12px;color:var(--text);line-height:1.6;max-height:200px;overflow-y:auto;}
.prompt-box .kw{color:var(--pink);font-weight:700;}

/* MISC */
.overlay-row{display:flex;align-items:center;gap:12px;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:8px 12px;}
input[type=range]{flex:1;height:4px;border-radius:2px;background:var(--border);appearance:none;}
input[type=range]::-webkit-slider-thumb{appearance:none;width:12px;height:12px;border-radius:50%;background:var(--purple2);cursor:pointer;}
.color-swatch{width:28px;height:28px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:transform .15s;}
.color-swatch.active{border-color:#fff;transform:scale(1.1);}

/* LAYER ITEM */
.layer-item{padding:10px 12px;background:var(--card2);border:1px solid var(--border);border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:all .2s;}
.layer-item:hover{border-color:rgba(255,255,255,0.15);}
.layer-item.active{background:rgba(124,58,237,0.1);border-color:var(--purple);box-shadow:inset 2px 0 0 var(--purple);}
.layer-type-icon{color:var(--muted);display:flex;align-items:center;justify-content:center;}
`;