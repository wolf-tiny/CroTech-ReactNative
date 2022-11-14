import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native'

const { width, height } = Dimensions.get('window')

let _this = null

export default  class Loading extends Component {
  constructor(props) {
    super(props)
    _this = this
    this.state = {
      show:false
    }
  }
  static show = () => {
    _this.setState({show: true})
  }
  static hide = () => {
    _this.setState({show: false})
  }
  render() {
    if (this.state.show) {
      return (
        <View style={styles.LoadingPage}>
          <ActivityIndicator size={"large"} color={'tomato'}/>
        </View>
      )
    } else {
      return <View />
    }
  }
}
const styles = StyleSheet.create({
  LoadingPage: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0)",
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
})