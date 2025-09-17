// Galaxy.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Galaxy() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 120;
    camera.position.y = 40;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Core glow
    const coreTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/sprites/circle.png"
    );
    const coreMaterial = new THREE.SpriteMaterial({
      map: coreTexture,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 1,
    });
    const coreGlow = new THREE.Sprite(coreMaterial);
    coreGlow.scale.set(1, 1, 1);
    scene.add(coreGlow);

    // Spiral stars
    const starCount = 25000;
    const armCount = 4;
    const spinFactor = 6;
    const randomness = 0.6;
    const radius = 80;

    const positions = new Float32Array(starCount * 3);
    const basePositions = new Float32Array(starCount * 3); // save original
    const colors = new Float32Array(starCount * 3);

    const innerColor = new THREE.Color("#800080");
    const outerColor = new THREE.Color("#cccccc");

    for (let i = 0; i < starCount; i++) {
      const arm = i % armCount;
      const distance = Math.pow(Math.random(), 2.5) * radius;
      const angleDeg = distance * spinFactor + (arm * 360) / armCount;
      const angle = (angleDeg * Math.PI) / 180;

      const randomX = (Math.random() - 0.5) * randomness * distance;
      const randomY = (Math.random() - 0.5) * randomness * (radius / 4);
      const randomZ = (Math.random() - 0.5) * randomness * distance;

      const x = Math.cos(angle) * distance + randomX;
      const y = randomY;
      const z = Math.sin(angle) * distance + randomZ;

      positions.set([x, y, z], i * 3);
      basePositions.set([x, y, z], i * 3);

      const t = distance / radius;
      const starColor = innerColor.clone().lerp(outerColor, t);
      colors.set([starColor.r, starColor.g, starColor.b], i * 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(geometry, starMaterial);
    stars.rotation.x = Math.PI / 6;
    scene.add(stars);

    // Blast state
    let blast = false;
    let blastStart = 0;

    // Mouse click → trigger blast
    function handleClick() {
      blast = true;
      blastStart = Date.now();
    }
    window.addEventListener("click", handleClick);

    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.y += 0.0008;
      coreGlow.material.opacity = 0.85 + Math.sin(Date.now() * 0.002) * 0.15;

      // Blast animation for 1 second
      if (blast) {
        const elapsed = (Date.now() - blastStart) / 1000; // in seconds
        const factor = elapsed * 2; // speed of blast

        for (let i = 0; i < starCount; i++) {
          const idx = i * 3;
          positions[idx] = basePositions[idx] * (1 + factor);
          positions[idx + 1] = basePositions[idx + 1] * (1 + factor);
          positions[idx + 2] = basePositions[idx + 2] * (1 + factor);
        }
        geometry.attributes.position.needsUpdate = true;

        if (elapsed > 1) {
          // reset after blast
          for (let i = 0; i < starCount * 3; i++) {
            positions[i] = basePositions[i];
          }
          geometry.attributes.position.needsUpdate = true;
          blast = false;
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
