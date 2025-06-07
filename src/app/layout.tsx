
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HyreSense - Revolutionize Your Job Search',
  description: 'AI-powered job matching. Find talent and get hired faster with HyreSense.',
};

const threeJsBackgroundScript = `
  if (typeof THREE === 'undefined') {
    console.error('Three.js library not loaded. Background will not render.');
  } else {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Style the canvas to be a background
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1'; // Ensure it's behind other content
    renderer.domElement.id = 'threejs-background-canvas';

    document.body.appendChild(renderer.domElement);

    // Create a torus geometry
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // Updated color to match theme accent color #29E2D2
    const material = new THREE.MeshBasicMaterial({ color: 0x29E2D2, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Add ambient light for a soft glow
    const ambientLight = new THREE.AmbientLight(0x404040); // Kept ambient light neutral
    scene.add(ambientLight);

    // Position the camera
    camera.position.z = 30;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    const handleResize = () => {
        if (renderer && camera) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
    };
    window.addEventListener('resize', handleResize);

    // Basic cleanup (won't run in this simple script context like a React component's useEffect cleanup)
    // Consider more robust cleanup if this were part of a component lifecycle.
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        {/* Added Three.js library from CDN */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-transparent`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
        {/* Added the Three.js background script */}
        <Script id="threejs-background-script" strategy="afterInteractive">
          {threeJsBackgroundScript}
        </Script>
      </body>
    </html>
  );
}
