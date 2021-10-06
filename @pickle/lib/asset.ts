export const calculateClip = (
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): {
  height: number
  width: number
} => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)

  return {
    height: Math.round(srcHeight * ratio),
    width: Math.round(srcWidth * ratio)
  }
}
