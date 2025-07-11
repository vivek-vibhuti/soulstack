import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const RobotScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const robotRef = useRef<THREE.Group | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);

  // Create robot geometry
  const createRobot = useMemo(() => {
    const robot = new THREE.Group();

    // Materials with enhanced properties
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });

    const accentMaterial = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      shininess: 150,
      emissive: 0x2a1a4a,
      emissiveIntensity: 0.2
    });

    const eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5
    });

    // Head
    const headGeometry = new THREE.BoxGeometry(1.2, 1, 1);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 2;
    robot.add(head);

    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 2.1, 0.4);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 2.1, 0.4);
    robot.add(leftEye, rightEye);

    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5);
    const antenna = new THREE.Mesh(antennaGeometry, accentMaterial);
    antenna.position.set(0, 2.75, 0);
    robot.add(antenna);

    const antennaTipGeometry = new THREE.SphereGeometry(0.1);
    const antennaTip = new THREE.Mesh(antennaTipGeometry, eyeMaterial);
    antennaTip.position.set(0, 3, 0);
    robot.add(antennaTip);

    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.5, 2, 0.8);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    robot.add(body);

    // Chest panel
    const chestGeometry = new THREE.BoxGeometry(1, 0.8, 0.1);
    const chest = new THREE.Mesh(chestGeometry, accentMaterial);
    chest.position.set(0, 0.2, 0.45);
    robot.add(chest);

    // Arms
    const armGeometry = new THREE.CylinderGeometry(0.2, 0.25, 1.5);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-1, 0.5, 0);
    leftArm.rotation.z = Math.PI / 6;
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(1, 0.5, 0);
    rightArm.rotation.z = -Math.PI / 6;
    robot.add(leftArm, rightArm);

    // Hands
    const handGeometry = new THREE.SphereGeometry(0.3);
    const leftHand = new THREE.Mesh(handGeometry, accentMaterial);
    leftHand.position.set(-1.4, -0.2, 0);
    const rightHand = new THREE.Mesh(handGeometry, accentMaterial);
    rightHand.position.set(1.4, -0.2, 0);
    robot.add(leftHand, rightHand);

    // Legs
    const legGeometry = new THREE.CylinderGeometry(0.25, 0.3, 1.8);
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.4, -1.9, 0);
    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.4, -1.9, 0);
    robot.add(leftLeg, rightLeg);

    // Feet
    const footGeometry = new THREE.BoxGeometry(0.6, 0.3, 1);
    const leftFoot = new THREE.Mesh(footGeometry, accentMaterial);
    leftFoot.position.set(-0.4, -2.85, 0.2);
    const rightFoot = new THREE.Mesh(footGeometry, accentMaterial);
    rightFoot.position.set(0.4, -2.85, 0.2);
    robot.add(leftFoot, rightFoot);

    return robot;
  }, []);

  // Create particle system
  const createParticleSystem = useMemo(() => {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(particles, particleMaterial);
  }, []);

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
    camera.position.set(0, 0, 8);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x4a90e2, 1, 10);
    pointLight1.position.set(-3, 2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 10);
    pointLight2.position.set(3, -2, 3);
    scene.add(pointLight2);

    // Add robot to scene
    const robot = createRobot;
    robotRef.current = robot;
    robot.position.y = -1;
    scene.add(robot);

    // Add particle system
    const particleSystem = createParticleSystem;
    particleSystemRef.current = particleSystem;
    scene.add(particleSystem);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Robot animations
      if (robot) {
        robot.rotation.y += 0.005;
        
        // Floating animation
        robot.position.y = -1 + Math.sin(Date.now() * 0.001) * 0.2;
        
        // Head bobbing
        const head = robot.children.find(child => child.position.y === 2);
         if (head) {
          head.rotation.x = Math.sin(Date.now() * 0.002) * 0.1;
        }

        // Eye glow animation
        robot.children.forEach(child => {
          if (child.material && child.material.emissive && child.material.color.getHex() === 0x00ffff) {
            child.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.003) * 0.3;
          }
        });
      }

      // Particle system animation
      if (particleSystem) {
        particleSystem.rotation.y += 0.001;
        particleSystem.rotation.x += 0.0005;
        
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(Date.now() * 0.001 + positions[i]) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations
    gsap.fromTo(robot.scale, 
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "back.out(1.7)", delay: 1.5 }
    );

    gsap.fromTo(robot.rotation, 
      { y: -Math.PI },
      { y: 0, duration: 2, ease: "power2.out", delay: 2 }
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
      if (!robot) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(robot.rotation, {
        x: mouseY * 0.1,
        y: mouseX * 0.2,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(camera.position, {
        x: mouseX * 0.5,
        y: mouseY * 0.5,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [createRobot, createParticleSystem]);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default RobotScene;