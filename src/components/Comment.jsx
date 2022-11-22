import { View, Text } from 'react-native'
import { formatDate } from '../utils/date'
import Avatar from './Avatar'

const Comment = ({description, author, creation_date}) => {
  return (
    <View>
      <Avatar uri={author.profile.avatar}/>
      <Text>{`${author.profile.first_name} ${author.profile.last_name}`}</Text>
      <Text>{formatDate(creation_date)}</Text>
      <Text>{description}</Text>
    </View>
  )
}

export default Comment