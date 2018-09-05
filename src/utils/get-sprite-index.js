// NOTE: landmarks spritesheets need to be composed on
// a carthesian grid with XY [0, 0] at the LEFT TOP
export default (spritesheet, [x, y]) => {
  if (!spritesheet) return
  return x + y * (spritesheet.width / spritesheet.resolution)
}
