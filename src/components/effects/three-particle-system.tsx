
'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeParticleSystem: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const logoTextureRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return; // Ensure window is defined for window.location.origin

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

    // Particles Group
    const particles = new THREE.Group();
    particlesGroupRef.current = particles;
    scene.add(particles);

    const particleCount = 75;
    const particlePositions = new Float32Array(particleCount * 3);

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const logoUrl = new URL('/logo.png', window.location.origin).href;

    textureLoader.load(
      logoUrl,
      (texture) => {
        logoTextureRef.current = texture;
        for (let i = 0; i < particleCount; i++) {
          const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            alphaTest: 0.5,
            transparent: true,
            color: 0xffffff,
            opacity: 0.85,
          });
          const sprite = new THREE.Sprite(spriteMaterial);

          const x = (Math.random() - 0.5) * 120;
          const y = (Math.random() - 0.5) * 120;
          const z = (Math.random() - 0.5) * 120;
          sprite.position.set(x, y, z);

          particlePositions[i * 3] = x;
          particlePositions[i * 3 + 1] = y;
          particlePositions[i * 3 + 2] = z;
          
          const baseScale = 2.5;
          // Dynamically set particle scale based on loaded logo aspect ratio
          if (texture.image && texture.image.width > 0 && texture.image.height > 0) {
            sprite.scale.set(baseScale, baseScale * (texture.image.height / texture.image.width), 1);
          } else {
            // Fallback scale if image dimensions are not available (e.g. 1:1 aspect ratio)
            sprite.scale.set(baseScale, baseScale, 1);
          }
          
          particles.add(sprite);
        }
      },
      undefined, 
      (errEvent: ErrorEvent) => { 
        let detailedMessage = `TextureLoader failed to load: ${logoUrl}`;
        if (errEvent) {
          detailedMessage += `\n  Event Type: ${errEvent.type}`;
          if (errEvent.message) {
            detailedMessage += `\n  Message: ${errEvent.message}`;
          }
          if (errEvent.error) {
            detailedMessage += `\n  Underlying error: ${errEvent.error.toString ? errEvent.error.toString() : JSON.stringify(errEvent.error)}`;
            if (errEvent.error instanceof Error && errEvent.error.stack) {
                 detailedMessage += `\n  Underlying error stack: ${errEvent.error.stack}`;
            }
          }
        }
        console.error(detailedMessage, errEvent); 
      }
    );

    // Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.y += 0.0003;
        particlesGroupRef.current.rotation.x += 0.00015;

        const time = Date.now() * 0.0003;

        particlesGroupRef.current.children.forEach((sprite, i) => {
          if (sprite instanceof THREE.Sprite) {
            sprite.position.x += Math.sin(time + i * 0.8) * 0.008;
            sprite.position.y += Math.cos(time + i * 0.6) * 0.008;
            sprite.position.z += Math.sin(time + i * 0.4) * 0.004;

            const boundary = 70;
            if (sprite.position.x > boundary) sprite.position.x = -boundary;
            if (sprite.position.x < -boundary) sprite.position.x = boundary;
            if (sprite.position.y > boundary) sprite.position.y = -boundary;
            if (sprite.position.y < -boundary) sprite.position.y = boundary;
            if (sprite.position.z > boundary) sprite.position.z = -boundary;
            if (sprite.position.z < -boundary) sprite.position.z = boundary;
          }
        });
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
      
      if(logoTextureRef.current) {
        logoTextureRef.current.dispose();
      }

      if (sceneRef.current) {
        sceneRef.current.traverse(object => {
            if (object instanceof THREE.Sprite) {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
            }
        });
      }
      
      if (particlesGroupRef.current) {
        while(particlesGroupRef.current.children.length > 0){ 
            particlesGroupRef.current.remove(particlesGroupRef.current.children[0]); 
        }
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (mountRef.current && rendererRef.current?.domElement) {
        if (mountRef.current.contains(rendererRef.current.domElement)) {
            mountRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      rendererRef.current = null; 
      cameraRef.current = null;
      sceneRef.current = null;
      particlesGroupRef.current = null;
      logoTextureRef.current = null;
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default ThreeParticleSystem;
