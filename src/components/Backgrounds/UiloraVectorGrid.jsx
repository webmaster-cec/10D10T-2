import { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Color } from 'ogl';

const VERTEX_SHADER = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;

  uniform float uTime;
  uniform float uSeconds;
  uniform float uMinutes;
  uniform float uHours;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  uniform float uGridSize;
  uniform float uRadius;

  varying vec2 vUv;

  // SDF for a simple Line (Needle)
  float sdLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 uv = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    // Grid Setup
    vec2 gv = fract(uv * uGridSize) - 0.5;
    vec2 id = floor(uv * uGridSize);

    // Kinetic Clock Logic
    // Ticking rotation: discrete steps with smooth transitions
    float tick = floor(uSeconds) + smoothstep(0.0, 0.4, fract(uSeconds));
    float secondAngle = tick * (2.0 * 3.14159 / 60.0) - 1.5708;
    
    // Mechanical wavefront based on position
    float delay = (id.x + id.y) * 0.15;
    float baseAngle = secondAngle - delay;
    
    // Mouse Influence (The "Magnet")
    float dist = distance(uv, mouse);
    float force = smoothstep(uRadius, 0.0, dist);
    
    // Calculate angle towards mouse
    vec2 dirToMouse = normalize(mouse - uv);
    float angleToMouse = atan(dirToMouse.y, dirToMouse.x);
    
    // Blend between clock behavior and mouse interaction
    float finalAngle = mix(baseAngle, angleToMouse, force);

    // Create dual hands (like a real kinetic clock unit)
    // Primary Hand
    vec2 p1 = vec2(cos(finalAngle), sin(finalAngle)) * 0.45;
    float hand1 = sdLine(gv, p1, vec2(0.0));
    
    // Secondary Hand (rotated slightly or offset)
    float hand2Angle = finalAngle + 0.5 * sin(uTime * 0.5 + delay);
    vec2 p2 = vec2(cos(hand2Angle), sin(hand2Angle)) * 0.35;
    float hand2 = sdLine(gv, p2, vec2(0.0));

    // Render the Lines (Clock Hands)
    float handMask = smoothstep(0.09, 0.0, min(hand1, hand2));

    // Defined background circle/face
    float distToCenter = length(gv);
    float faceRing = smoothstep(0.48, 0.46, distToCenter) * smoothstep(0.42, 0.44, distToCenter);
    float centerDot = smoothstep(0.06, 0.04, distToCenter);
    
    // Total mask - increased contrast for background elements
    float mask = max(handMask, max(faceRing * 0.6, centerDot));

    // Color logic: needles glow when they react to mouse
    vec3 color = mix(uColor, uAccentColor, force);
    
    // Contrast enhancement - more aggressive glow
    color += force * 0.4; 
    
    // Pointer logic - less aggressive fade for better overall brightness
    float head = smoothstep(-0.2, 0.6, dot(gv, p1));
    color *= mix(0.7, 1.0, head); 

    // Visibility blend: much higher baseline for visibility
    float visibility = mix(0.7, 1.0, force);
    
    gl_FragColor = vec4(color, mask * visibility);
  }
`;

const UiloraVectorGrid = ({
    gridSize = 50,
    color = "#ffffff",
    accentColor = "#888888",
    mouseRadius = 0.5,
}) => {
    const containerRef = useRef(null);
    const mousePos = useRef(new Vec2(0.5, 0.5));
    const targetMouse = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({ alpha: true, antialias: true, dpr: window.devicePixelRatio });
        const gl = renderer.gl;
        containerRef.current.appendChild(gl.canvas);

        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex: VERTEX_SHADER,
            fragment: FRAGMENT_SHADER,
            transparent: true,
            uniforms: {
                uTime: { value: 0 },
                uSeconds: { value: 0 },
                uMinutes: { value: 0 },
                uHours: { value: 0 },
                uResolution: { value: new Vec2() },
                uMouse: { value: mousePos.current },
                uColor: { value: new Color(color) },
                uAccentColor: { value: new Color(accentColor) },
                uGridSize: { value: gridSize },
                uRadius: { value: mouseRadius },
            },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const resize = () => {
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            renderer.setSize(width, height);
            program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const onMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            // Map mouse to 0.0 - 1.0 range based on the local container dimensions
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMouse.current.set(x, y);
        };
        window.addEventListener('mousemove', onMouseMove);

        let requestId;
        const update = (t) => {
            requestId = requestAnimationFrame(update);

            const now = new Date();
            const ms = now.getMilliseconds() / 1000;
            const s = now.getSeconds() + ms;
            const m = now.getMinutes() + s / 60;
            const h = (now.getHours() % 12) + m / 60;

            // Smooth lerp to give the needles "weight"
            mousePos.current.lerp(targetMouse.current, 0.08);

            program.uniforms.uTime.value = t * 0.001;
            program.uniforms.uSeconds.value = s;
            program.uniforms.uMinutes.value = m;
            program.uniforms.uHours.value = h;

            renderer.render({ scene: mesh });
        };
        requestId = requestAnimationFrame(update);

        const currentContainer = containerRef.current;

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(requestId);
            gl.getExtension('WEBGL_lose_context')?.loseContext();
            if (currentContainer?.contains(gl.canvas)) currentContainer.removeChild(gl.canvas);
        };
    }, [color, accentColor, gridSize, mouseRadius]);

    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export default UiloraVectorGrid;
