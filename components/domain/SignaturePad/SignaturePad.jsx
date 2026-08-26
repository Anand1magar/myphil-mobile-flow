import React, { useEffect, useRef, useState } from 'react';

export function SignaturePad({ signed = false, name = '', height = 140 }) {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const prev = document.createElement('canvas');
      prev.width = canvas.width;
      prev.height = canvas.height;
      prev.getContext('2d').drawImage(canvas, 0, 0);

      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const ctx = canvas.getContext('2d');
      ctx.scale(ratio, ratio);
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--pitch').trim() || '#0A0A0A';
      if (prev.width && prev.height) ctx.drawImage(prev, 0, 0, prev.width, prev.height, 0, 0, rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e) => {
    canvasRef.current.setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const { x, y } = getPoint(e);
    canvasRef.current.getContext('2d').beginPath();
    canvasRef.current.getContext('2d').moveTo(x, y);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const { x, y } = getPoint(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => { isDrawing.current = false; };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const showPlaceholderSignature = signed && !hasDrawn;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-body)' }}>
      <div style={{ position: 'relative', width: '100%', height, borderRadius: 4, background: '#fff', boxShadow: '0 0 0 1px var(--fade)', overflow: 'hidden', touchAction: 'none' }}>
        <canvas
          ref={canvasRef}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
        />
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 28, borderTop: '1px dashed var(--mortar-grey)', pointerEvents: 'none' }} />
        {!hasDrawn && !signed && (
          <span style={{ position: 'absolute', top: 12, left: 16, color: 'var(--mortar-grey)', fontSize: 14, pointerEvents: 'none' }}>Sign here</span>
        )}
        {showPlaceholderSignature && (
          <span style={{ position: 'absolute', left: 16, bottom: 32, fontFamily: 'cursive', fontSize: 32, color: 'var(--pitch)', pointerEvents: 'none' }}>{name || 'Signature'}</span>
        )}
      </div>
      <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); clear(); }} style={{ fontSize: 14, color: 'var(--sky)' }}>Clear</a>
      </div>
    </div>
  );
}
