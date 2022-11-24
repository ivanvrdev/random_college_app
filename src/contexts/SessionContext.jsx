import { createContext, useReducer, useEffect } from "react"

export const SessionContext = createContext()

const initialState = {
  token: null,
  user: null,
  posts: null
}

const sessionReducer = (state, action) =>{

  const { type, payload } = action

  const actions = {
    '@SESSION/LOGIN': () => ({...state, user: payload.user, token: payload.token}),
    '@SESSION/LOGOUT': () => initialState,
    '@POSTS/LOAD': () => ({...state, posts: payload}),
    '@POSTS/ADD': () => ({...state, posts: [payload, ...state.posts]}),
    '@POSTS/UPDATE_ONE': () => {
      const posts = [...state.posts]
      const foundPost = posts.find(post => post._id === payload.postId)
      const postIndex = posts.indexOf(foundPost)
      posts.splice(postIndex, 1, payload.updatedPost)
      return {...state, posts}
    }
  }

  return actions[type] ? actions[type]() : state 
}

export const SessionContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(sessionReducer, initialState)

  // useEffect(()=>{console.log('estado: ', state)}, [state])

  return (
    <SessionContext.Provider value={{state, dispatch}}>
      {children}
    </SessionContext.Provider>
  )
}
