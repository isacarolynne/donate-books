import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Login from './screen/Login'
import SingUp from './screen/SingUp'

const stackNavigator = createStackNavigator({
  Login, SingUp
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: null,

    })
  }

)

let Routes = createAppContainer(stackNavigator)

export default Routes
