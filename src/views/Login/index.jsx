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

import { SessionContext } from "../../contexts/SessionContext"

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

      dispatch({type: 'LOGIN', payload: { token, user }})
      navigation.navigate('Home')
    } catch (error) {
      console.log('Error al loguear: ', error)
      CreateErrorAlert()
    } 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={loginSchema}
        onSubmit={sendData}
      >
        {({handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting}) => (
          <>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]} 
              placeholder="nombre de usuario"
              onBlur={handleBlur('username')}
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {errors.username && <Text style={styles.textError}>{errors.username}</Text>}
            <TextInput 
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="contraseña"
              secureTextEntry={true}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {errors.password && <Text style={styles.textError}>{errors.password}</Text>}
            <TouchableOpacity 
              style={styles.submit}
              disabled={!(Object.keys(errors).length === 0 && Object.keys(touched).length === 2)} 
              onPress={handleSubmit}
            >
              {
                isSubmitting ? 
                <ActivityIndicator color="#ffffff"/> :
                <Text style={styles.submitText}>Enviar</Text>
              }
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1
  },
  inputError: {
    borderColor: 'red',
    marginBottom: 0
  },
  textError: {
    marginLeft: 10,
    color: 'red'
  },
  submit: {
    height: 40,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2898ee'
  },
  submitText: {
    color: 'white'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10
  }
})

export default Login