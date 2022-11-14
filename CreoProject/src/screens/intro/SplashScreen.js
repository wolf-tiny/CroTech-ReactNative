import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Text, Spacer } from "@react-native-material/core"

const SplashScreen = (props) => {
  const INTRO_TIME = 5000

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Main')
    }, INTRO_TIME)
  }, [])

  return (
    <SafeAreaView style={styles.full_size}>
      <Text variant="h3" style={styles.text_title}>
        Interview
        <Text variant="subtitle2" color='white'>
          Challenge
        </Text>
      </Text>
      <Spacer />
      <Text variant="subtitle2" style={styles.text_bottom}>
        2022.11.11
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  full_size: {
    width: "100%",
    height: "100%",
    backgroundColor: 'tomato',
    alignItems: 'center'
  },
  text_title: {
    marginTop: 200,
    color: 'white'
  },
  text_bottom: {
    marginBottom: 50,
    color: 'white'
  }
})

export default SplashScreen