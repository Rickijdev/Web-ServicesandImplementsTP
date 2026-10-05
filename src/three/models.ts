import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export type PartId = "chip" | "servo" | "arm" | "case";
export type ComponentModel = {
  group: THREE.Group;
  animate: (progress: number) => void;
};
const colors = {
  board: 0x183331,
  dark: 0x242529,
  metal: 0xbec2c0,
  gold: 0xbd9957,
  ivory: 0xe9dfcd,
  blue: 0x1b5684,
};
function material(color: number, metalness = 0.1, roughness = 0.45) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}
function box(
  parent: THREE.Object3D,
  size: number[],
  position: number[],
  mat: THREE.Material,
  radius = 0.04,
) {
  const geometry = new RoundedBoxGeometry(
    size[0],
    size[1],
    size[2],
    3,
    Math.min(radius, ...size.map((n) => n / 3)),
  );
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(position[0], position[1], position[2]);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}
function disk(
  parent: THREE.Object3D,
  radius: number,
  depth: number,
  position: number[],
  mat: THREE.Material,
  hole = 0,
) {
  let geometry: THREE.BufferGeometry;
  if (hole) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    const cutout = new THREE.Path();
    cutout.absarc(0, 0, hole, 0, Math.PI * 2, true);
    shape.holes.push(cutout);
    geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.014,
      bevelThickness: 0.014,
      curveSegments: 20,
    });
    geometry.translate(0, 0, -depth / 2);
  } else {
    geometry = new THREE.CylinderGeometry(radius, radius, depth, 28);
    geometry.rotateX(Math.PI / 2);
  }
  const mesh = new THREE.Mesh(geometry, mat);
  mesh.position.set(position[0], position[1], position[2]);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function screw(
  parent: THREE.Object3D,
  x: number,
  y: number,
  z: number,
  scale = 1,
) {
  disk(
    parent,
    0.065 * scale,
    0.03,
    [x, y, z],
    material(colors.metal, 0.9, 0.3),
  );
  box(
    parent,
    [0.075 * scale, 0.012 * scale, 0.012],
    [x, y, z + 0.02],
    material(colors.dark),
    0.002,
  );
  box(
    parent,
    [0.012 * scale, 0.075 * scale, 0.012],
    [x, y, z + 0.02],
    material(colors.dark),
    0.002,
  );
}
function cable(
  parent: THREE.Object3D,
  points: number[][],
  color: number,
  radius = 0.025,
) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...(p as [number, number, number]))),
  );
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 40, radius, 8, false),
    material(color),
  );
  parent.add(mesh);
  return mesh;
}
function chip(): ComponentModel {
  const group = new THREE.Group();
  group.name = "ESP32";
  const pcb = material(colors.board, 0.25, 0.5),
    silver = material(colors.metal, 0.85, 0.28),
    gold = material(colors.gold, 0.8, 0.3),
    dark = material(colors.dark);
  box(group, [1.8, 3.1, 0.11], [0, 0, 0], pcb, 0.12);
  box(group, [1.18, 1.37, 0.2], [0, 0.3, 0.18], silver, 0.06);
  box(group, [1.02, 0.06, 0.01], [0, 0.82, 0.291], material(0xa8adaa), 0.005);
  // Etched shield detail, antenna traces and gold plated contacts.
  for (let j = 0; j < 3; j++)
    box(
      group,
      [0.53 - j * 0.12, 0.018, 0.013],
      [0, 0.3 - j * 0.13, 0.29],
      material(0x737c78),
      0.003,
    );
  for (let i = 0; i < 5; i++) {
    box(group, [0.78, 0.025, 0.025], [0, 1.03 + i * 0.095, 0.075], gold, 0.006);
    if (i < 4)
      box(
        group,
        [0.025, 0.12, 0.025],
        [i % 2 ? -0.375 : 0.375, 1.08 + i * 0.095, 0.075],
        gold,
        0.005,
      );
  }
  for (const x of [-0.77, 0.77]) {
    box(group, [0.19, 2.4, 0.16], [x, -0.07, -0.1], dark);
    for (let i = 0; i < 14; i++) {
      const y = 1.13 - i * 0.175;
      disk(group, 0.047, 0.024, [x, y, 0.066], gold, 0.022);
      box(group, [0.045, 0.045, 0.4], [x, y, -0.24], gold, 0.004);
      box(
        group,
        [0.085, 0.018, 0.01],
        [x * 0.79, y, 0.069],
        material(0xd8ddd2),
        0.002,
      );
    }
  }
  box(group, [0.5, 0.35, 0.31], [0, -1.38, 0.18], silver);
  box(group, [0.37, 0.1, 0.04], [0, -1.55, 0.22], dark, 0.03);
  box(group, [0.24, 0.28, 0.11], [0, -0.66, 0.15], dark, 0.01);
  for (let i = 0; i < 6; i++) {
    box(
      group,
      [0.1, 0.06, 0.055],
      [-0.43 + (i % 3) * 0.43, -0.89 - Math.floor(i / 3) * 0.2, 0.09],
      material(i % 2 ? 0x757569 : 0x403931),
      0.006,
    );
  }
  for (const x of [-0.53, 0.53]) {
    box(group, [0.23, 0.22, 0.1], [x, -1.22, 0.12], silver);
    disk(group, 0.06, 0.05, [x, -1.22, 0.2], dark);
  }
  const lightMaterial = new THREE.MeshStandardMaterial({
    color: 0x77d2ca,
    emissive: 0x54caba,
    emissiveIntensity: 0.5,
  });
  box(group, [0.09, 0.07, 0.06], [0.42, -0.65, 0.1], lightMaterial, 0.01);
  for (const x of [-0.74, 0.74])
    for (const y of [-1.4, 1.4])
      disk(group, 0.064, 0.013, [x, y, 0.066], gold, 0.04);
  return {
    group,
    animate: (p) => {
      lightMaterial.emissiveIntensity =
        0.5 + Math.pow(Math.sin(p * Math.PI * 3), 2) * 3;
    },
  };
}
function servo(): ComponentModel {
  const group = new THREE.Group();
  group.name = "Servomotor";
  const blue = material(colors.blue, 0.25, 0.3),
    dark = material(0x14374c, 0.2),
    ivory = material(0xf3eee4, 0.2),
    silver = material(colors.metal, 0.85, 0.3);
  box(group, [1.4, 1.8, 1.05], [0, -0.25, 0], blue, 0.095);
  box(group, [1.45, 0.23, 1.1], [0, 0.62, 0], dark, 0.04);
  box(group, [1.45, 0.2, 1.1], [0, -1.1, 0], dark, 0.04);
  for (const x of [-0.89, 0.89]) {
    box(group, [0.53, 0.16, 1.0], [x, 0.26, 0], blue);
    disk(group, 0.085, 0.035, [x, 0.26, 0.52], silver, 0.04);
  }
  box(group, [0.8, 0.74, 0.015], [0, -0.24, 0.536], material(0xe1d9bc), 0.015);
  for (let j = 0; j < 3; j++)
    box(
      group,
      [0.45 - j * 0.09, 0.025, 0.007],
      [-0.05, -0.07 - j * 0.14, 0.547],
      dark,
      0.003,
    );
  for (const x of [-0.56, 0.56])
    for (const y of [-0.97, 0.49]) screw(group, x, y, 0.555, 0.7);
  disk(group, 0.44, 0.22, [0.26, 0.87, 0], blue);
  disk(group, 0.24, 0.44, [0.26, 0.87, 0.24], material(colors.gold, 0.7));
  const horn = new THREE.Group();
  horn.position.set(0.26, 0.87, 0.54);
  group.add(horn);
  box(horn, [0.3, 1.85, 0.12], [0, 0, 0.08], ivory, 0.1);
  disk(horn, 0.27, 0.16, [0, 0, 0.1], ivory);
  for (const y of [-0.73, -0.48, 0.48, 0.73])
    disk(horn, 0.055, 0.02, [0, y, 0.15], dark);
  screw(horn, 0, 0, 0.23, 1.5);
  for (let i = 0; i < 3; i++)
    cable(
      group,
      [
        [0.3, -1.2, -0.2],
        [0.4 + i * 0.075, -1.6, -0.1],
        [0.9 + i * 0.075, -1.55, 0.1],
        [1.02 + i * 0.075, -0.83, 0.1],
      ],
      [0x312e29, 0xad4d37, 0xcba95e][i],
    );
  const set = (p: number) => {
    horn.rotation.z = -0.35 + Math.sin(p * Math.PI) * 1.25;
  };
  set(0);
  return { group, animate: set };
}
function arm(): ComponentModel {
  const group = new THREE.Group();
  group.name = "Brazo";
  const pivot = new THREE.Group();
  pivot.position.y = -0.5;
  group.add(pivot);
  const mat = material(0xd1b287, 0.55, 0.38),
    ivory = material(colors.ivory, 0.2, 0.4),
    dark = material(colors.dark);
  const shape = new THREE.Shape();
  shape.moveTo(-0.28, 0);
  shape.lineTo(-0.16, 2.0);
  shape.quadraticCurveTo(-0.16, 2.16, 0, 2.16);
  shape.quadraticCurveTo(0.16, 2.16, 0.16, 2);
  shape.lineTo(0.28, 0);
  shape.absarc(0, 0, 0.28, 0, Math.PI, true);
  for (const y of [0.55, 0.85, 1.15, 1.45, 1.75]) {
    const hole = new THREE.Path();
    hole.absarc(0, y, 0.06, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const lever = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.024,
      bevelThickness: 0.02,
      curveSegments: 32,
    }),
    ivory,
  );
  lever.castShadow = true;
  pivot.add(lever);
  disk(pivot, 0.44, 0.23, [0, 0, 0.03], mat, 0.14);
  disk(pivot, 0.16, 0.29, [0, 0, 0.08], dark, 0.075);
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    screw(pivot, Math.sin(a) * 0.33, Math.cos(a) * 0.33, 0.16, 0.5);
  }
  box(pivot, [0.52, 0.25, 0.48], [0, 2.06, 0.26], dark, 0.07);
  const set = (p: number) => {
    pivot.rotation.z = -0.42 + Math.sin(p * Math.PI) * 0.7;
  };
  set(0);
  return { group, animate: set };
}
function housing(): ComponentModel {
  const group = new THREE.Group();
  group.name = "Carcasa 3D";
  const shell = material(colors.ivory, 0.12, 0.53),
    dark = material(0x6f5148, 0.3);
  box(group, [2.4, 2.85, 0.13], [0, -0.1, -0.3], shell, 0.11);
  for (const x of [-1.14, 1.14])
    box(group, [0.14, 2.8, 0.65], [x, -0.1, 0.01], shell, 0.045);
  for (const y of [-1.46, 1.26])
    box(group, [2.25, 0.14, 0.65], [0, y, 0.01], shell, 0.04);
  for (const x of [-0.91, 0.91])
    for (const y of [-1.19, 0.99])
      disk(group, 0.11, 0.38, [x, y, -0.03], shell, 0.048);
  for (const x of [-1.36, 1.36])
    for (const y of [-1.05, 1]) {
      box(group, [0.39, 0.38, 0.12], [x, y, -0.28], shell, 0.09);
      disk(group, 0.065, 0.014, [x, y, -0.21], dark, 0.035);
    }
  const lid = new THREE.Group();
  lid.position.set(0, 0.17, 0.7);
  group.add(lid);
  box(lid, [2.4, 2.85, 0.12], [0, 0, 0], shell, 0.11);
  for (let i = 0; i < 6; i++)
    box(lid, [0.5, 0.046, 0.016], [0.52, -0.3 + i * 0.14, 0.063], dark, 0.02);
  box(lid, [0.54, 0.022, 0.014], [-0.5, 0.76, 0.068], dark, 0.004);
  box(lid, [0.33, 0.022, 0.014], [-0.6, 0.64, 0.068], dark, 0.004);
  for (const x of [-0.99, 0.99])
    for (const y of [-1.21, 1.21]) screw(lid, x, y, 0.08, 0.7);
  const set = (p: number) => {
    lid.position.set(
      0,
      0.17 + Math.sin(p * Math.PI) * 0.75,
      0.7 + Math.sin(p * Math.PI) * 0.9,
    );
  };
  set(0);
  group.scale.setScalar(0.88);
  return { group, animate: set };
}
export function createComponentModel(part: PartId): ComponentModel {
  const result = { chip, servo, arm, case: housing }[part]();
  result.group.userData.part = part;
  return result;
}
export function disposeModel(group: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  group.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      geometries.add(object.geometry);
      (Array.isArray(object.material)
        ? object.material
        : [object.material]
      ).forEach((m) => materials.add(m));
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
}
