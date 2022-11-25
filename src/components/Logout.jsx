import { useContext } from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@expo/vector-icons"

import { SessionContext } from "../contexts/SessionContext"

const Logout = () => {

  const navigation = useNavigation()

  const { dispatch } = useContext(SessionContext)

  const handleLogout = () => {
    navigation.navigate('Login')
    setTimeout(()=>dispatch({type: '@SESSION/LOGOUT'}), 1000)
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleLogout}
    >
      <MaterialIcons name="logout" size={30} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: 20
  }
})

export default Logout