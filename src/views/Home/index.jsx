import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"

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
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link text={'Notas'} to={'Grades'}/>
      <Link text={'Personas'} to={'People'}/>
      <Link text={'Perfil'} to={'Profile'}/>
      <Link text={'Materia'} to={'Subject'}/>
      <Link text={'Materias'} to={'Subjects'}/>
    </View>
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