import { useRef, useState } from "react";

export default function BgUpload({ imageUrl, onImage, onClear }) {
  const [drag, setDrag] = useState(false);
  const ref = useRef(null);
 
  const processFile = (file) => {
    if (!file||!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onImage(url);
  };
 
  return (
    <div
      className={`drop-zone ${drag?"drag-over":""} ${imageUrl?"has-image":""}`}
      onDragOver={e=>{e.preventDefault();setDrag(true);}}
      onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);processFile(e.dataTransfer.files[0]);}}
      onClick={()=>!imageUrl&&ref.current?.click()}
    >
      <input ref={ref} type="file" accept="image/*" style={{display:"none"}}
        onChange={e=>processFile(e.target.files[0])}/>
      {imageUrl ? (
        <>
          <img src={imageUrl} alt="bg" className="drop-zone-preview"/>
          <div style={{fontSize:11,color:"var(--green)",fontWeight:700,letterSpacing:1}}>✓ Custom background loaded</div>
          <button className="drop-zone-clear" onClick={e=>{e.stopPropagation();onClear();}}>✕ Remove</button>
        </>
      ) : (
        <>
          <div style={{fontSize:22,marginBottom:6}}>🖼️</div>
          <div className="drop-zone-text">
            <span>Click to upload</span> or drag &amp; drop<br/>
            <span style={{color:"var(--muted)",fontSize:10}}>PNG · JPG · WEBP — game screenshot or art</span>
          </div>
        </>
      )}
    </div>
  );
}