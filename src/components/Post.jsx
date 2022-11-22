// import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Avatar from './Avatar'
import Comment from './Comment'

import { formatDate } from '../utils/date'

const Post = ({_id, content, comments, author, creation_date}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar uri={author.profile.avatar}/>
        <View style={styles.nameContainer}>
          <Text style={styles.fullname}>{`${author.profile.first_name} ${author.profile.last_name}`}</Text>
          <Text style={styles.date}>{formatDate(creation_date)}</Text>
        </View>
      </View>
      <Text style={styles.header}>{content.header}</Text>
      <Text>{content.description}</Text>
      {/* {
        comments.map((comment, index) => <Comment key={index} {...comment} />)
      } */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10, 
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
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default Post