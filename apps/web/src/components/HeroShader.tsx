"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo shader 3D (el hero de Stitch): grid en perspectiva con glow
 * lavanda/índigo + partículas flotantes. Sin dependencias: WebGL puro.
 */
export default function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    const wrap = ref.current;
    if (!wrap) return;
    wrap.appendChild(canvas);

    // Sincronizar el buffer de dibujo con el tamaño CSS
    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    if (typeof ResizeObserver !== "undefined") {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float grid(vec2 uv, float res) {
    vec2 g = fract(uv * res);
    float line = min(g.x, g.y);
    return 1.0 - smoothstep(0.0, 0.02, line);
}

void main() {
    vec2 uv = v_texCoord;

    // Transformación de perspectiva para el piso
    float perspective = 1.0 / (uv.y + 0.1);
    vec2 p_uv = vec2((uv.x - 0.5) * perspective, perspective + u_time * 0.2);

    // Base negro profundo
    vec3 color = vec3(0.043, 0.047, 0.063); // ~#0b0c10

    // Grid 3D con glow lavanda/índigo
    float g = grid(p_uv, 10.0) * uv.y; // funde con la distancia
    color += g * vec3(0.63, 0.56, 0.85); // lavender suave

    // Glow radial central (lavanda)
    float glow = length(uv - vec2(0.5, 0.5));
    color += (1.0 - smoothstep(0.0, 0.8, glow)) * vec3(0.28, 0.2, 0.45);

    // Partículas flotantes
    float particles = fract(sin(dot(uv + u_time * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
    if (particles > 0.995) color += vec3(0.78, 0.72, 1.0) * (0.5 + 0.5 * sin(u_time));

    gl_FragColor = vec4(color, 1.0);
}`;

    // Nota: `gl` ya se validó arriba (if (!gl) return) — el `!` es solo para
    // el narrow dentro del closure, que TS no puede comprobar por el hoisting.
    function cs(type: number, src: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    const prog = gl!.createProgram();
    if (!prog) return;
    const vsh = cs(gl.VERTEX_SHADER, vs);
    const fsh = cs(gl.FRAGMENT_SHADER, fs);
    if (!vsh || !fsh) return;
    gl.attachShader(prog, vsh);
    gl.attachShader(prog, fsh);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const render = (t: number) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      if (wrap) {
        try {
          wrap.removeChild(canvas);
        } catch {
          /* ya removido */
        }
      }
    };
  }, []);

  return <div ref={ref} aria-hidden className="absolute inset-0 w-full" />;
}
