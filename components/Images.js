import { getStrapiMedia } from "../lib/media"
import NextImage from "next/image"

const Images = ({ image, style }) => {
  const { url, alternativeText, width, height } = image.data.attributes

  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      // loader={loader}
      layout="fill"
      objectFit="cover"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  )
}

export default Images
