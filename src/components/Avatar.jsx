import { Image } from "react-native"

const Avatar = ({width = 40, height = 40, uri}) => (
  <Image 
    source={{uri}}
    style={{width, height, borderRadius: 50}}
  />
)

export default Avatar
