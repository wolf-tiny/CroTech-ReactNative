import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { Text, Spacer } from "@react-native-material/core"

const SplashScreen = (props) => {
  const INTRO_TIME = 5000

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Main')
    }, INTRO_TIME)
  }, [])

  return (
    <SafeAreaView style={{
      width: "100%",
      height: "100%",
      backgroundColor: 'tomato',
      alignItems: 'center'
    }}>
      <Text variant="h3" style={{
        marginTop: 200,
        color: 'white'
      }}>
        Interview
        <Text variant="subtitle2" style={{
          color: 'white'
        }}>
          Challenge
        </Text>
      </Text>
      <Spacer />
      <Text variant="subtitle2" style={{
        marginBottom: 50,
        color: 'white'
      }}>
        2022.11.11
      </Text>
    </SafeAreaView>
  )
}

export default SplashScreen