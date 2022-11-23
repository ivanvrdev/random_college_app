import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native'

import Avatar from './Avatar'
import CommentInput from './CommentInput'

import { formatDate } from '../utils/date'
import { Ionicons } from '@expo/vector-icons'

const Comment = ({description, author, creation_date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar uri={author.profile.avatar}/>
        <View style={styles.nameContainer}>
          <Text style={styles.fullname}>{`${author.profile.first_name} ${author.profile.last_name}`}</Text>
          <Text style={styles.date}>{formatDate(creation_date)}</Text>
        </View>
      </View>
      <Text>{description}</Text>
    </View>
  )
}

const Post = ({_id, content, comments = [], author, creation_date}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.profileContainer}>
            <Avatar uri={author.profile.avatar}/>
            <View style={styles.nameContainer}>
              <Text style={styles.fullname}>{`${author.profile.first_name} ${author.profile.last_name}`}</Text>
              <Text style={styles.date}>{formatDate(creation_date)}</Text>
            </View>
          </View>
          <Text style={styles.header}>{content.header}</Text>
          <Text>{content.description}</Text>
          {
            comments.length > 0 &&
            <Text style={styles.comments}>{comments.length} {comments.length > 1 ? 'comentarios':'comentario'}</Text>
          }
        </View>
        <View style={styles.addCommentContainer}>
          <TouchableOpacity onPress={()=>setModalVisible(true)}>
            <Text style={styles.addComment}>Agregar un comentario</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <View style={styles.modalTopContainer}>
          <TouchableOpacity
            style={styles.modalClose}
            onPress={()=>setModalVisible(false)}
          >
            {/* Volver atrás en lugar de close */}
            <Ionicons name='arrow-back' size={30} color='black' />
          </TouchableOpacity>
          <Text style={styles.modalTopText}>Comentarios</Text>
        </View>
        <ScrollView>
          {comments.map((comment, index) => <Comment key={index} {...comment}/>)}
        </ScrollView>
        <CommentInput />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  contentContainer: {
    padding: 10
  },
  profileContainer: {
    flexDirection: 'row'
  },
  nameContainer: {
    marginLeft: 10
  },
  fullname: {
    fontWeight: 'bold'
  },
  date: {
    color: 'gray'
  },
  header: {
    fontSize: 17
  },
  comments: {
    color: '#00b4ff',
    fontWeight: 'bold'
  },
  addComment: {
    color: 'gray'
  },
  addCommentContainer: {
    borderTopWidth: 1,
    borderTopColor: 'gray',
    padding: 10
  },
  modalTopContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10
  },
  modalClose: {
    margin: 10
  },
  modalTopText: {
    alignSelf: 'center',
    fontSize: 18
  }
})

export default Post