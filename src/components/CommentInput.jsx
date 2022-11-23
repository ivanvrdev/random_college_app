import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CommentInput = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Escribe un comentario...' 
      />
      <TouchableOpacity
        style={styles.submit}
      >
        <Ionicons name="send" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    marginStart: 10,
    width: '80%'
  },
  submit: {
    padding: 10
  }
})

export default CommentInput