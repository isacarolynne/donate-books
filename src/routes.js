import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Login from './screen/Login'
import SingUp from './screen/SingUp'
import ChatList from './screen/ChatList'
import Chat from './screen/Chat'
import Profile from './screen/Profile'

const stackNavigator = createStackNavigator({
  Profile,
  Login, 
  // SingUp,
  // ChatList,
  // Chat,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: null,

    })
  }

)

let Routes = createAppContainer(stackNavigator)

export default Routes
