import React, { useState } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import TextTicker from 'react-native-text-ticker'
import SoundPlayer from 'react-native-sound-player'

const MainItem = ({ detail }) => {

  return (
    <TouchableOpacity
      onPress={() => {
        try {
          if (detail.previewUrl !== undefined) {
            SoundPlayer.playUrl(detail.previewUrl)
          }
        } catch (e) {
          console.log(`cannot play the sound file`, e)
        }
      }}
      style={{
        width: "100%",
        backgroundColor: "#f9e2de",
        marginBottom: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row'
      }}>
      <View>
        <Image style={{
          width: 50,
          height: 50,
          margin: 20
        }}
          source={{ uri: detail.artworkUrl100 }} />
      </View>
      <View style={{
        flexShrink: 1,
        marginRight: 20
      }}>
        {/* <TextTicker
          duration={10000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10
          }}>
          {detail.collectionName}
        </TextTicker> */}
        <Text
          numberOfLines={1}
          lineBreakMode
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10
          }}>
          {detail.collectionName}
        </Text>
        <Text>
          {detail.country}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MainItem