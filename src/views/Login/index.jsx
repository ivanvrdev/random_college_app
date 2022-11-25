import { useContext } from "react"
import {
  Alert, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import * as Yup from "yup"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

import { SessionContext } from "../../contexts/SessionContext"

import gobalStyles from '../../style/style'

import { REACT_APP_BACKEND as backend} from "@env"

const loginSchema = Yup.object({
  username: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido')
})

const Login = () => {
  
  const navigation = useNavigation()
  
  const { dispatch } = useContext(SessionContext)
  
  const CreateErrorAlert = () => (
    Alert.alert(
      'Error de autenticación',
      'Inténtelo de nuevo más tarde',
      [
        {
          text: 'Ok'
        }
      ]
    )
  )

  const sendData = async (values) => {

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(values)
    } 

    try {
      const response = await fetch(`${backend}/auth/login`, config)
  
      if(!response.ok) {
        console.log('Error al loguear')
        CreateErrorAlert()
        return
      }
  
      const data = await response.json()

      const { token, user } = data

      dispatch({type: '@SESSION/LOGIN', payload: { token, user }})
      navigation.navigate('Home')
    } catch (error) {
      console.log('Error al loguear: ', error)
      CreateErrorAlert()
    } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instituto Random</Text>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={sendData}
      >
        {({handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting}) => {
          
          const disabled = !(Object.keys(errors).length === 0 && Object.keys(touched).length === 2)
          
          return (
          <>
            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <FontAwesome5 name="user" size={24} color="black" />  
                <TextInput
                  style={styles.input} 
                  placeholder="usuario"
                  onBlur={handleBlur('username')}
                  onChangeText={handleChange('username')}
                  value={values.username}
                />
              </View>
              <View style={styles.divider}></View>
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock-outline" size={24} color="black" /> 
                <TextInput
                  style={styles.input}
                  placeholder="contraseña"
                  secureTextEntry={true}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
            </View>
            <TouchableOpacity 
              style={[styles.submit, disabled && styles.disabledSubmit]}
              disabled={disabled} 
              onPress={handleSubmit}
            >
              {
                isSubmitting ? 
                <ActivityIndicator color="#ffffff"/> :
                <Text style={styles.submitText}>Continuar</Text>
              }
            </TouchableOpacity>
          </>
        )}}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center'
  },
  inputGroup: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    marginLeft: 10,
    width: '85%',
    fontSize: 20
  },
  submit: {
    padding: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: gobalStyles.primaryColor,
    borderRadius: 20
  },
  disabledSubmit: {
    backgroundColor: gobalStyles.secondaryColor
  },
  submitText: {
    color: 'white',
    fontSize: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10
  },
  divider: {
    height: 2,
    backgroundColor: '#f0f0f0'
  }
})

export default Login