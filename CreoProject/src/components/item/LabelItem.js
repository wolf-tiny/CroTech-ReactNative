import React from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const MainItem = ({ detail }) => {

  return (
    <View
      style={styles.item_view}>
      <Text style={styles.item_text}>
        {detail}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item_view: {
    width: "100%",
    backgroundColor: "#f9e2de",
    marginBottom: 10,
    borderRadius: 10
  },
  item_text: {
    padding: 20,
    color: 'black',
    fontWeight: 'bold'
  }
})

export default MainItem