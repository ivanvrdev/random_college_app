import { useContext, useState } from 'react'
import {
  Alert, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  ActivityIndicator 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Avatar from './Avatar'

import { SessionContext } from '../contexts/SessionContext'

import { REACT_APP_BACKEND as backend } from '@env'

const postSchema = Yup.object({
  header: Yup.string()
  .required('Campo requerido')
  .min(5, 'Demasiado corto')
  .max(50, 'Demasiado largo'),
  description: Yup.string()
  .required('Campo requerido')
  .min(5, 'Demasiado corto')
  .max(200, 'Demasiado largo')
})

const PostInput = () => {

  const { state } = useContext(SessionContext)

  const [ modalVisible, setModalVisible ] = useState(false)

  const CreateErrorAlert = () => (
    Alert.alert(
      'Ocurrió un error',
      'Inténtelo de nuevo más tarde',
      [
        {
          text: 'Ok'
        }
      ]
    )
  )

  const sendData = async ({header, description}) => {
    const body = {
      author: state.user._id,
      content: { header, description },
      type: 'público',
      classroom: null
    }
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        token: state.token
      },
      method: 'POST',
      body: JSON.stringify(body)
    }

    try{
      const response = await fetch(`${backend}/post/create`, config)
  
      if(!response.ok) {
        CreateErrorAlert()
        return
      }

      setModalVisible(false)
      
    }catch(error) {
      CreateErrorAlert()
      console.log(error)
    }
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={()=>setModalVisible(true)}>
        <View style={styles.textContainer}>
          <Avatar uri={state.user.profile.avatar}/>
          <Text style={styles.text}>Anuncia algo a la clase</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        visible={modalVisible}
      >
        <Formik
          initialValues={{
            header: '',
            description: ''
          }}
          validationSchema={postSchema}
          onSubmit={sendData}
        >
          {({handleBlur, handleChange, handleSubmit, errors, touched, values, isSubmitting})=>(
            <>
              <View style={styles.modalTopContainer}>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={()=>setModalVisible(false)}
                >
                  <Ionicons name='close' size={30} color='black' />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submit}
                  onPress={handleSubmit}
                  disabled={!(Object.keys(errors).length === 0 && Object.keys(touched).length === 2)}
                >
                  {
                    isSubmitting ? 
                    <ActivityIndicator color="#ffffff"/> :
                    <Text style={styles.submitText}>Publicar</Text>
                  }
                </TouchableOpacity>
              </View>
              <View>
                <View style={styles.inputContainer}>
                  <MaterialIcons name='title' size={30} color='black' />
                  <TextInput 
                    style={styles.input} 
                    placeholder='Título'
                    onChangeText={handleChange('header')}
                    onBlur={handleBlur('header')}
                    value={values.header}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <MaterialIcons name='description' size={30} color='black' />
                  <TextInput 
                    style={styles.input}
                    placeholder='Descripción'
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    value={values.description}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  textContainer: {
    flexDirection: 'row'
  },
  text: {
    alignSelf: 'center',
    marginStart: 10,
    fontSize: 16
  },
  modalTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  modalClose: {
    margin: 10,
  },
  submit: {
    width: 80,
    marginEnd: 15,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00b4ff'
  },
  submitText: {
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  input: {
    marginStart: 10,
    width: '80%'
  }
})

export default PostInput