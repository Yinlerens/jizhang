"use client";

import { useEffect, useRef } from "react";
import {
  categoryColors,
  type CrystalStructureProfile,
  type PeriodicElement,
} from "@/lib/periodic-table";

export interface CrystalAtomModel {
  x: number;
  y: number;
  z: number;
  size?: number;
  tone?: "primary" | "secondary" | "ghost";
}

interface CrystalLatticeThreeProps {
  atoms: CrystalAtomModel[];
  crystal: CrystalStructureProfile;
  element: PeriodicElement;
}

export default function CrystalLatticeThree({ atoms, crystal, element }: CrystalLatticeThreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let frameId: number | null = null;
    let observer: ResizeObserver | null = null;
    let mountedContainer: HTMLDivElement | null = null;

    const mount = async () => {
      const THREE = await import("three");
      const container = containerRef.current;

      if (!container || disposed) {
        return;
      }

      mountedContainer = container;
      const palette = categoryColors[element.category];
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const group = new THREE.Group();
      const cellGroup = new THREE.Group();
      const atomGroup = new THREE.Group();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      camera.position.set(3.8, 3.2, 5.2);
      camera.lookAt(0, 0, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 1.8));

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(4, 5, 5);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(new THREE.Color(palette.accent), 1.6);
      rimLight.position.set(-3, -2, 4);
      scene.add(rimLight);

      const box = new THREE.BoxGeometry(3, 3, 3);
      const edges = new THREE.EdgesGeometry(box);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: new THREE.Color(palette.stroke),
          transparent: true,
          opacity: 0.68,
        }),
      );
      cellGroup.add(line);

      const primaryMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.accent),
        roughness: 0.36,
        metalness: element.category.includes("metal") ? 0.58 : 0.22,
        emissive: new THREE.Color(palette.accent),
        emissiveIntensity: 0.12,
      });
      const secondaryMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(palette.fill),
        roughness: 0.48,
        metalness: 0.25,
      });
      const ghostMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#cbd5e1"),
        roughness: 0.52,
        metalness: 0.18,
        transparent: true,
        opacity: 0.72,
      });
      const sphere = new THREE.SphereGeometry(0.14, 32, 18);

      atoms.forEach((atom) => {
        const material =
          atom.tone === "secondary"
            ? secondaryMaterial
            : atom.tone === "ghost"
              ? ghostMaterial
              : primaryMaterial;
        const mesh = new THREE.Mesh(sphere, material);

        mesh.position.set(atom.x / 70, -atom.y / 70, atom.z / 70);
        mesh.scale.setScalar(atom.size ?? 1);
        atomGroup.add(mesh);
      });

      if (crystal.visualFamily === "fcc" || crystal.visualFamily === "diamond") {
        const faceRingMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(palette.accent),
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
        });
        const ring = new THREE.TorusGeometry(0.78, 0.008, 8, 64);
        const faceRings = [
          [0, 0, 1.5, 0, 0, 0],
          [0, 0, -1.5, 0, 0, 0],
          [1.5, 0, 0, 0, Math.PI / 2, 0],
          [-1.5, 0, 0, 0, Math.PI / 2, 0],
          [0, 1.5, 0, Math.PI / 2, 0, 0],
          [0, -1.5, 0, Math.PI / 2, 0, 0],
        ];

        faceRings.forEach(([x, y, z, rx, ry, rz]) => {
          const mesh = new THREE.Mesh(ring, faceRingMaterial);
          mesh.position.set(x, y, z);
          mesh.rotation.set(rx, ry, rz);
          cellGroup.add(mesh);
        });
      }

      group.add(cellGroup);
      group.add(atomGroup);
      scene.add(group);

      const resize = () => {
        const width = container.clientWidth || 520;
        const height = container.clientHeight || 330;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };

      observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();

      const animate = () => {
        if (disposed) {
          return;
        }

        group.rotation.x = -0.48;
        group.rotation.y += 0.006;
        group.rotation.z = crystal.visualFamily === "monoclinic" ? 0.16 : 0;
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      animate();
    };

    void mount();

    return () => {
      disposed = true;
      observer?.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (mountedContainer) {
        mountedContainer.replaceChildren();
      }
    };
  }, [atoms, crystal.visualFamily, element.category]);

  return (
    <div
      ref={containerRef}
      className="h-78 min-h-78 w-full rounded-xl border border-zinc-800 bg-zinc-950"
      aria-label={`${element.name} 的 Three.js ${crystal.name}晶体结构`}
    />
  );
}
