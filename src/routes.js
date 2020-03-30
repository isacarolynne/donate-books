import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'

import Login from './screen/Login'
import SingUp from './screen/SingUp'
import NewDonate from './screen/NewDonate'

const stackNavigator = createStackNavigator({
  Login, SingUp, NewDonate
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: null,

    })
  }

)

let Routes = createAppContainer(stackNavigator)

export default Routes
