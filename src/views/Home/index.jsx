import { useEffect, useContext } from "react"
import { StyleSheet, ScrollView } from "react-native"

import Post from "../../components/Post"
import PostInput from "../../components/PostInput"

import { SessionContext } from "../../contexts/SessionContext"

import { REACT_APP_BACKEND as backend} from "@env" 

const Home = () => {

  const { state: { posts }, dispatch } = useContext(SessionContext)

  const getPosts = async () => {
    const response = await fetch(`${backend}/public/post`)

    const data = await response.json()

    dispatch({type: '@POSTS/LOAD', payload: data.posts.reverse()})
  }

  useEffect(()=>{
    getPosts()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <PostInput />
      {
        posts &&
        posts.map((post, index) => <Post key={index} {...post} />)
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  link: {
    padding: 10,
    margin: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home