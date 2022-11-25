import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Login from './src/views/Login'
import Home from './src/views/Home'
import Grades from './src/views/Grades'
import People from './src/views/People'
import Profile from './src/views/Profile'
import Subject from './src/views/Subject'
import Subjects from './src/views/Subjects'

import Logout from "./src/components/Logout"

import { SessionContextProvider } from "./src/contexts/SessionContext"

const Stack = createStackNavigator()

export default function App() {
  return (
    <SessionContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login} 
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{
              title: 'Inicio',
              headerLeft: null,
              headerRight: () => (<Logout />)
            }}
          />
          {/* <Stack.Screen name="Grades" component={Grades}/>
          <Stack.Screen name="People" component={People}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Subject" component={Subject}/>
          <Stack.Screen name="Subjects" component={Subjects}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SessionContextProvider>
  )
}
