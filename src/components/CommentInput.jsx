import { useContext } from 'react'
import { ActivityIndicator, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { DefaultErrorAlert } from './ErrorAlert'

import { SessionContext } from '../contexts/SessionContext'
import globalStyles from '../style/style'

import { REACT_APP_BACKEND as backend } from '@env'

const commentSchema = Yup.object({
  description: Yup.string()
  .required()
  .min(3)
  .max(100)
})

const CommentInput = ({postId, comments}) => {

  const { state, dispatch } = useContext(SessionContext)

  const sendData = async ({ description }) => {
    
    const body = JSON.stringify({
      comments: [
        ...comments,
        {
          author: state.user._id,
          description
        }
      ]
    })
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        token: state.token
      },
      method: 'PUT',
      body
    }

    try {
      const response = await fetch(`${backend}/post/update/${postId}`, config)

      if(!response.ok) {
        DefaultErrorAlert()
        return
      }

      const data = await response.json()

      dispatch({type: '@POSTS/UPDATE_ONE', payload: {postId, updatedPost: data.post}})
    } catch(error) {
      DefaultErrorAlert()
      console.log(error)
    }
  }
  
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{description: ''}}
        validationSchema={commentSchema}
        onSubmit={sendData}
      >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => {
          
          let disabled = !(Object.keys(errors).length === 0 && Object.keys(touched).length === 1) 

          return (
            <>
              <TextInput
                style={styles.input}
                placeholder='Escribe un comentario...'
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              <TouchableOpacity
                style={styles.submit}
                onPress={handleSubmit}
                disabled={disabled}
              >
                { 
                  isSubmitting ?
                  <ActivityIndicator color="#000"/> :
                  <Ionicons name="send" size={24} color={disabled ? globalStyles.secondaryColor : globalStyles.primaryColor} />
                }
              </TouchableOpacity>
            </>
          )
        }}
      </Formik>
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