import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"

import Post from "../../components/Post"

import { REACT_APP_BACKEND as backend} from "@env" 

const Link = ({text, to}) => {
  
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={()=>navigation.navigate(to)}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

const Home = () => {

  const [posts, setPosts] = useState(null)

  const getPosts = async () => {
    const response = await fetch(`${backend}/public/post`)

    const data = await response.json()

    setPosts(data.posts.reverse())
  }

  useEffect(()=>{
    getPosts()
  }, [])

  return (
    <ScrollView style={styles.container}>
      {/* <Text>Home</Text>
      <Link text={'Notas'} to={'Grades'}/>
      <Link text={'Personas'} to={'People'}/>
      <Link text={'Perfil'} to={'Profile'}/>
      <Link text={'Materia'} to={'Subject'}/>
      <Link text={'Materias'} to={'Subjects'}/> */}
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