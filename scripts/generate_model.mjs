import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

if (typeof globalThis.FileReader === 'undefined') {
  class FileReaderPolyfill {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${Buffer.from(buf).toString('base64')}`;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
  }
  globalThis.FileReader = FileReaderPolyfill;
}

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scene = new THREE.Scene();
const building = new THREE.Group();
building.name = 'LaztarHeadquarters';

// Premium Architectural Materials
const stoneMat = new THREE.MeshStandardMaterial({
  name: 'Mat_TravertineStone',
  color: 0x8a929e,
  roughness: 0.45,
  metalness: 0.2,
});

const titaniumMat = new THREE.MeshStandardMaterial({
  name: 'Mat_TitaniumFacade',
  color: 0x3d434d,
  roughness: 0.3,
  metalness: 0.85,
});

const goldAccentMat = new THREE.MeshStandardMaterial({
  name: 'Mat_ChampagneGold',
  color: 0xd4af37,
  roughness: 0.22,
  metalness: 0.95,
});

const glassMat = new THREE.MeshPhysicalMaterial({
  name: 'Mat_ArchitecturalGlass',
  color: 0x88ccff,
  transparent: true,
  opacity: 0.65,
  roughness: 0.05,
  metalness: 0.15,
  transmission: 0.85,
  ior: 1.52,
  side: THREE.DoubleSide,
});

const frostedDarkGlassMat = new THREE.MeshPhysicalMaterial({
  name: 'Mat_FrostedDarkGlass',
  color: 0x141820,
  roughness: 0.3,
  metalness: 0.4,
  transmission: 0.6,
  transparent: true,
  opacity: 0.92,
  side: THREE.DoubleSide,
});

const canvasPlaceholderMat = new THREE.MeshStandardMaterial({
  name: 'Mat_CanvasPlaceholder',
  color: 0xffffff,
  roughness: 0.3,
  metalness: 0.1,
});

const lightCoreMat = new THREE.MeshStandardMaterial({
  name: 'Mat_IlluminatedCore',
  color: 0xffe6aa,
  emissive: 0xffbe55,
  emissiveIntensity: 0.6,
  roughness: 0.2,
});

// 1. Foundation Podium
const podiumGeo = new THREE.BoxGeometry(16, 1.0, 16);
const podium = new THREE.Mesh(podiumGeo, stoneMat);
podium.name = 'Stone_Podium';
podium.position.set(0, 0.5, 0);
building.add(podium);

// Podium Gold Band
const podiumBandGeo = new THREE.BoxGeometry(16.2, 0.15, 16.2);
const podiumBand = new THREE.Mesh(podiumBandGeo, goldAccentMat);
podiumBand.name = 'Gold_PodiumBand';
podiumBand.position.set(0, 0.95, 0);
building.add(podiumBand);

// 2. Grand Entrance Lobby Pavilion & Showroom Room
// Glass perimeter walls enclosing the showroom space (12 x 4.0 x 12)
const lobbyGlassGeo = new THREE.BoxGeometry(12, 4.0, 12);
const lobbyGlass = new THREE.Mesh(lobbyGlassGeo, glassMat);
lobbyGlass.name = 'Glass_Lobby';
lobbyGlass.position.set(0, 3.0, 0);
building.add(lobbyGlass);

// Lobby Floor Slab
const lobbyFloorGeo = new THREE.BoxGeometry(11.9, 0.2, 11.9);
const lobbyFloor = new THREE.Mesh(lobbyFloorGeo, stoneMat);
lobbyFloor.name = 'Stone_LobbyFloor';
lobbyFloor.position.set(0, 1.1, 0);
building.add(lobbyFloor);

// ========================================================
// SHOWROOM INTERIOR EXHIBITION (100% Inside Glass Pavilion)
// ========================================================
// Frosted Dark Glass Partition Wall mounted inside the room
const showroomWallGeo = new THREE.BoxGeometry(8.6, 3.2, 0.12);
const showroomWall = new THREE.Mesh(showroomWallGeo, frostedDarkGlassMat);
showroomWall.name = 'Frosted_ShowroomWall';
showroomWall.position.set(0, 2.9, -1.2);
building.add(showroomWall);

// Gold header trim on showroom wall
const wallTrimGeo = new THREE.BoxGeometry(8.7, 0.08, 0.16);
const wallTrim = new THREE.Mesh(wallTrimGeo, goldAccentMat);
wallTrim.name = 'Gold_WallTrim';
wallTrim.position.set(0, 4.52, -1.2);
building.add(wallTrim);

// 3 Exhibition Display Sets (Gold Frame + Canvas + Stone Plinth)
const frameOffsets = [-2.6, 0.0, 2.6];
frameOffsets.forEach((xPos, idx) => {
  // Gold Bezel Rim
  const bezelGeo = new THREE.BoxGeometry(2.18, 1.48, 0.05);
  const bezel = new THREE.Mesh(bezelGeo, goldAccentMat);
  bezel.name = `Gold_Frame_${idx + 1}`;
  bezel.position.set(xPos, 3.05, -1.12);
  building.add(bezel);

  // Picture Canvas Face (will receive project texture in Three.js)
  const canvasGeo = new THREE.PlaneGeometry(2.1, 1.4);
  const canvasMesh = new THREE.Mesh(canvasGeo, canvasPlaceholderMat);
  canvasMesh.name = `Showroom_Canvas_${idx + 1}`;
  canvasMesh.position.set(xPos, 3.05, -1.08);
  building.add(canvasMesh);

  // Interior Exhibition Plinth / Pedestal under each frame
  const plinthGeo = new THREE.BoxGeometry(2.15, 0.45, 0.7);
  const plinth = new THREE.Mesh(plinthGeo, titaniumMat);
  plinth.name = `Showroom_Plinth_${idx + 1}`;
  plinth.position.set(xPos, 1.35, -0.9);
  building.add(plinth);

  // Gold accent line on plinth
  const plinthGoldGeo = new THREE.BoxGeometry(2.17, 0.04, 0.72);
  const plinthGold = new THREE.Mesh(plinthGoldGeo, goldAccentMat);
  plinthGold.name = `Gold_PlinthTrim_${idx + 1}`;
  plinthGold.position.set(xPos, 1.58, -0.9);
  building.add(plinthGold);
});

// Perimeter Structural Columns
for (let x = -5.5; x <= 5.5; x += 11) {
  for (let z = -5.5; z <= 5.5; z += 11) {
    const colGeo = new THREE.CylinderGeometry(0.3, 0.3, 4.0, 16);
    const col = new THREE.Mesh(colGeo, titaniumMat);
    col.name = 'Column_Lobby';
    col.position.set(x, 3.0, z);
    building.add(col);
  }
}

// 3. Middle Tier Cantilever Block (Floors 2 to 5)
const midFloorGeo = new THREE.BoxGeometry(14, 0.6, 14);
const midFloorSlab = new THREE.Mesh(midFloorGeo, stoneMat);
midFloorSlab.name = 'Stone_MidFloorSlab';
midFloorSlab.position.set(0, 5.3, 0);
building.add(midFloorSlab);

const midGlassGeo = new THREE.BoxGeometry(11, 7.0, 11);
const midGlass = new THREE.Mesh(midGlassGeo, glassMat);
midGlass.name = 'Glass_MidTier';
midGlass.position.set(0, 8.8, 0);
building.add(midGlass);

const midCoreGeo = new THREE.BoxGeometry(5.5, 6.8, 5.5);
const midCore = new THREE.Mesh(midCoreGeo, lightCoreMat);
midCore.name = 'Core_MidTier';
midCore.position.set(0, 8.8, 0);
building.add(midCore);

// Architectural Vertical Louvers & Fins
for (let i = -5.0; i <= 5.0; i += 2.5) {
  const finGeo = new THREE.BoxGeometry(0.12, 7.0, 0.6);
  const finFront = new THREE.Mesh(finGeo, goldAccentMat);
  finFront.name = 'Gold_Fin';
  finFront.position.set(i, 8.8, 5.7);
  building.add(finFront);

  const finBack = new THREE.Mesh(finGeo, goldAccentMat);
  finBack.name = 'Gold_Fin';
  finBack.position.set(i, 8.8, -5.7);
  building.add(finBack);
}

// 4. Upper Tier Offset Sky-Lounge (Floors 6 to 9)
const upperSlabGeo = new THREE.BoxGeometry(13, 0.6, 13);
const upperSlab = new THREE.Mesh(upperSlabGeo, stoneMat);
upperSlab.name = 'Stone_UpperSlab';
upperSlab.position.set(0.8, 12.6, -0.5);
building.add(upperSlab);

const upperGlassGeo = new THREE.BoxGeometry(10, 6.5, 9.5);
const upperGlass = new THREE.Mesh(upperGlassGeo, glassMat);
upperGlass.name = 'Glass_UpperTier';
upperGlass.position.set(0.8, 15.85, -0.5);
building.add(upperGlass);

// Diagonal Titanium Cantilever Feature
const featureWallGeo = new THREE.BoxGeometry(1.2, 7.0, 9.7);
const featureWall = new THREE.Mesh(featureWallGeo, titaniumMat);
featureWall.name = 'Titanium_FeatureWall';
featureWall.position.set(-4.4, 15.85, -0.5);
building.add(featureWall);

const goldRibbonGeo = new THREE.BoxGeometry(0.2, 7.2, 0.2);
const goldRibbon = new THREE.Mesh(goldRibbonGeo, goldAccentMat);
goldRibbon.name = 'Gold_Ribbon';
goldRibbon.position.set(-3.7, 15.85, 4.4);
building.add(goldRibbon);

// 5. Penthouse Crown & Sky Spire
const crownSlabGeo = new THREE.BoxGeometry(11, 0.5, 10.5);
const crownSlab = new THREE.Mesh(crownSlabGeo, goldAccentMat);
crownSlab.name = 'Gold_CrownSlab';
crownSlab.position.set(0.8, 19.35, -0.5);
building.add(crownSlab);

const penthouseGlassGeo = new THREE.BoxGeometry(7.0, 2.5, 6.5);
const penthouseGlass = new THREE.Mesh(penthouseGlassGeo, glassMat);
penthouseGlass.name = 'Glass_Penthouse';
penthouseGlass.position.set(0.8, 20.85, -0.5);
building.add(penthouseGlass);

const spireGeo = new THREE.CylinderGeometry(0.08, 0.35, 6.0, 16);
const spire = new THREE.Mesh(spireGeo, goldAccentMat);
spire.name = 'Gold_Spire';
spire.position.set(-2.5, 23.5, -2.5);
building.add(spire);

scene.add(building);

const exporter = new GLTFExporter();
try {
  const gltf = await exporter.parseAsync(scene, { binary: true });
  const outputPath = path.resolve(__dirname, '../public/models/building.glb');
  fs.writeFileSync(outputPath, Buffer.from(gltf));
  console.log(`Generated building.glb successfully (${gltf.byteLength} bytes) with enclosed interior showroom.`);
} catch (err) {
  console.error('Error generating GLB:', err);
}
