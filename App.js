import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import Home from './src/views/Home'
import Grades from './src/views/Grades'
import People from './src/views/People'
import Profile from './src/views/Profile'
import Subject from './src/views/Subject'
import Subjects from './src/views/Subjects'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Grades" component={Grades}/>
        <Stack.Screen name="People" component={People}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Subject" component={Subject}/>
        <Stack.Screen name="Subjects" component={Subjects}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
