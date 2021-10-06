import { Dimensions } from '@pickle/types/asset'
import { Asset } from '@pickle/types/graphcms'

export const getDimensions = (asset: Asset, size = 500): Dimensions => {
  const height = asset.height as number
  const width = asset.width as number

  const ratio = Math.min(size / width, size / height)

  return {
    height: Math.round(height * ratio),
    width: Math.round(width * ratio)
  }
}
