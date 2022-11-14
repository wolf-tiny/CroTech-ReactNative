/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react'
import {
  View,
  BackHandler
} from 'react-native'
import { RootSiblingParent } from 'react-native-root-siblings'

import AppNavigator from './src/navigation/AppNavigator';
import NavigationService from './src/navigation/NavigationService'
import Loading from "./src/components/dialog/Loading";

const APP_QUIT_ROUTES = [
  'Splash'
]

const App = () => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)
  }, [])

  const handleBackPress = () => {
    const currentRouteName = NavigationService.getCurrentRoute(NavigationService.getTopLevelNavigator().state.nav)

    if (!APP_QUIT_ROUTES.includes(currentRouteName)) {
      return false
    }

    BackHandler.exitApp()

    return true
  }
  
  return (
    <RootSiblingParent>
      <View style={{
        width: "100%",
        height: "100%"
      }}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} />
        <Loading />
      </View>
    </RootSiblingParent>
  )
}

export default App
