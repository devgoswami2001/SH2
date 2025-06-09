
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeParticleSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.PointsMaterial> | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);


  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 50;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particles
    const particles = new THREE.Group();
    particlesGroupRef.current = particles;
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      // Theme-aligned colors: primary-like (Deep Blue) and accent-like (Teal)
      const randomColor = Math.random();
      let r, g, b;
      if (randomColor > 0.5) { // Teal-like
        r = 0 / 255; g = 188 / 255; b = 212 / 255; // #00BCD4
      } else { // Deep Blue-like
        r = 26 / 255; g = 35 / 255; b = 126 / 255; // #1A237E
      }
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ 
        size: 2, 
        vertexColors: true, 
        transparent: true, 
        opacity: 0.7,
        sizeAttenuation: true // Points get smaller further away
    });
    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    particles.add(points);

    // Connections
    const linePositions: number[] = [];
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const p1 = new THREE.Vector3(positions[i*3], positions[i*3+1], positions[i*3+2]);
        const p2 = new THREE.Vector3(positions[j*3], positions[j*3+1], positions[j*3+2]);
        const dist = p1.distanceTo(p2);
        
        if (dist < 20) { // Connection distance threshold
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    if (linePositions.length > 0) {
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        // Use a theme-aligned color for lines, e.g., a lighter shade of primary or accent
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00BCD4, opacity: 0.15, transparent: true }); 
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        particles.add(lines);
    }
    
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.y += 0.0005; // Slower rotation
      }

      const time = Date.now() * 0.0005; // Slower particle movement
      const currentPositions = (pointsRef.current?.geometry.attributes.position as THREE.BufferAttribute)?.array as Float32Array;

      if (currentPositions) {
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            // Subtle movement, can be adjusted
            currentPositions[i3] += Math.sin(time + i * 0.3) * 0.005; 
            currentPositions[i3 + 1] += Math.cos(time + i * 0.5) * 0.005;
            // currentPositions[i3+2] remains static or moves less for a flatter effect if desired
        }
        if (pointsRef.current) {
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (rendererRef.current && cameraRef.current && mountRef.current) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      // Dispose Three.js objects
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => {
              if (mat.map) mat.map.dispose(); // Dispose textures if any
              mat.dispose();
            });
          } else if (object.material) {
            const mat = object.material as THREE.Material;
            if ((mat as any).map) (mat as any).map.dispose();
            mat.dispose();
          }
        }
      });
      
      if (rendererRef.current) {
        rendererRef.current.dispose(); // Dispose renderer
      }

      if (mountRef.current && rendererRef.current?.domElement) {
        if (mountRef.current.contains(rendererRef.current.domElement)) {
            mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      rendererRef.current = null; // Clear refs
      cameraRef.current = null;
      sceneRef.current = null;
      particlesGroupRef.current = null;
      pointsRef.current = null;
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeParticleSystem;
