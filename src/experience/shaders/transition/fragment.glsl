precision highp float;

varying vec2 vUv;

uniform float uProgress;   // 0 → 1, animated on model switch
uniform float uTime;

// ─── Noise helpers ────────────────────────────────────────────────────────────
vec3 mod289(vec3 x){ return x - floor(x*(1./289.))*289.; }
vec2 mod289(vec2 x){ return x - floor(x*(1./289.))*289.; }
vec3 permute(vec3 x){ return mod289(((x*34.)+1.)*x); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.,i1.y,1.)) + i.x + vec3(0.,i1.x,1.));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.*fract(p*C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x+0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x  = a0.x*x0.x + h.x*x0.y;
  g.yz = a0.yz*x12.xz + h.yz*x12.yw;
  return 130.*dot(m, g);
}
// ──────────────────────────────────────────────────────────────────────────────

// Gold / obsidian brand colours
vec3 GOLD    = vec3(0.831, 0.686, 0.216);   // #D4AF37
vec3 OBSIDIAN = vec3(0.02,  0.02,  0.02);

void main() {
  // Animated noise mask — gives a liquid-gold dissolve feel
  float noise = snoise(vUv * 3.5 + vec2(uTime * 0.4, uTime * 0.2));
  float mask  = smoothstep(uProgress - 0.35, uProgress + 0.35, (vUv.y + noise * 0.25) * 0.5 + 0.25);

  // Edge glow — bright gold fringe at the wavefront
  float edgeDist  = abs(mask - 0.5);
  float edgeGlow  = smoothstep(0.5, 0.0, edgeDist) * 1.8;

  // Base colour: obsidian cover with gold shimmer at edges
  vec3 colour = mix(OBSIDIAN, GOLD, edgeGlow * 0.6);

  // Overall opacity: full at mid-transition, transparent at 0 and 1
  float alpha = sin(uProgress * 3.14159) * mask;
  // Also fade in/out the edge glow on top
  alpha = max(alpha, edgeGlow * sin(uProgress * 3.14159) * 0.9);

  gl_FragColor = vec4(colour, clamp(alpha, 0.0, 1.0));
}
