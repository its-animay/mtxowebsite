import * as THREE from 'three';

export const createGradientTexture = (colors: string[], size: number = 256) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return null;
  
  const gradient = ctx.createLinearGradient(0, 0, 0, size);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / (colors.length - 1), color);
  });
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

export const createParticleSystem = (count: number, spread: number = 10) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random position
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread;
    
    // Random color
    const color = new THREE.Color(`hsl(${Math.random() * 360}, 70%, 60%)`);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  
  return geometry;
};

export const createWireframeGeometry = (geometry: THREE.BufferGeometry) => {
  const wireframe = new THREE.WireframeGeometry(geometry);
  return wireframe;
};

export const createGlowMaterial = (color: string, intensity: number = 1) => {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      intensity: { value: intensity }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float intensity;
      varying vec3 vNormal;
      void main() {
        float glow = dot(vNormal, vec3(0, 0, 1));
        glow = pow(glow, intensity);
        gl_FragColor = vec4(color * glow, glow);
      }
    `,
    transparent: true,
    side: THREE.BackSide
  });
};

export const createHologramMaterial = (color: string = '#00ffff') => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(color) }
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        float alpha = 0.5 + 0.5 * sin(vPosition.y * 10.0 + time * 5.0);
        alpha *= 0.8;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};
