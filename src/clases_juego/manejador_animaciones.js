
export function crearAnimacion(scene, player, key, startFrame, endFrame, frame_rate = 8) {
    scene.anims.create({
      key: key,
      frames: scene.anims.generateFrameNumbers(player, { start: startFrame, end: endFrame }),
      frameRate: frame_rate,
      repeat: -1
    });
  }