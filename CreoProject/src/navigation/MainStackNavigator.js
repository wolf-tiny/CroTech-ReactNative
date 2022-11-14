import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'
import MainScreen from '../screens/main/MainScreen'

const MainStackNavigator = createStackNavigator({
  Main: MainScreen,
},
  {
    headerMode: '',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  })

export default MainStackNavigator
