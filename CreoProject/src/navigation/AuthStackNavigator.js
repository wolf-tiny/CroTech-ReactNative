import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import SplashScreen from '../screens/intro/SplashScreen'

const AuthStackNavigator = createStackNavigator({
  Splash: SplashScreen,
},
  {
    headerMode: 'screen ',
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  })

export default AuthStackNavigator
