import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create geometry group
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Create multiple geometric shapes
    const shapes = [];

    // Main torus
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    meshGroup.add(torus);
    shapes.push(torus);

    // Dodecahedron
    const dodecaGeometry = new THREE.DodecahedronGeometry(0.8);
    const dodecaMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
    dodeca.position.set(2, 1, -1);
    meshGroup.add(dodeca);
    shapes.push(dodeca);

    // Icosahedron
    const icosaGeometry = new THREE.IcosahedronGeometry(0.6);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const icosa = new THREE.Mesh(icosaGeometry, icosaMaterial);
    icosa.position.set(-2, -1, 1);
    meshGroup.add(icosa);
    shapes.push(icosa);

    // Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.5);
    const octaMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const octa = new THREE.Mesh(octaGeometry, octaMaterial);
    octa.position.set(1.5, -1.5, 0);
    meshGroup.add(octa);
    shapes.push(octa);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate individual shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 * (index + 1);
        shape.rotation.y += 0.008 * (index + 1);
      });

      // Rotate the entire group
      meshGroup.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.fromTo(meshGroup.rotation, 
      { y: 0 },
      { y: Math.PI * 2, duration: 20, repeat: -1, ease: "none" }
    );

    gsap.fromTo(meshGroup.scale, 
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "back.out(1.7)", delay: 1.5 }
    );

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      if (!meshGroup) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(meshGroup.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.1,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Dispose geometries and materials
      shapes.forEach(shape => {
        shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach(material => material.dispose());
        } else {
          shape.material.dispose();
        }
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default ThreeScene;