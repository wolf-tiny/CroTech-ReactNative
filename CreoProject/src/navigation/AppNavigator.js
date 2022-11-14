import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthStackNavigator from './AuthStackNavigator'
import MainStackNavigator from './MainStackNavigator'


export default createAppContainer(createSwitchNavigator({
  Main: MainStackNavigator,
  Auth: AuthStackNavigator,
}, {
  initialRouteName: 'Auth'
}))