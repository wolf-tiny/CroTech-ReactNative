import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  TextInput,
  Image,
  View,
  ScrollView
} from 'react-native'
import { requestGet } from '../../utils/APIUtils'
import { API_APPLE_MISIC_URL } from '../../constants/Constants'

import MainItem from '../../components/item/MainItem'

const MainScreen = () => {

  const [list, setList] = useState([])
  const [search, setSearch] = useState('radioHead')
  const [second, setSecond] = useState(0)

  useEffect(() => {
    getList()

    const timer = setInterval(() => {
      setSecond((second) => second + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (list.length !== 0) {
      setList(list.slice(1).concat(list[0]))
    }
  }, [second])

  const getList = () => {
    if (list.length !== 0) {
      setList([])
    }
    if (search === '') {
      return
    }
    requestGet(API_APPLE_MISIC_URL + search).then((response) => {
      const tempList = response.results.sort((a, b) => {
        if (a.collectionName === undefined || b.collectionName === undefined) {
          return 0
        }
        let fa = a.collectionName.toLowerCase(),
          fb = b.collectionName.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })

      const filteredArr = tempList.reduce((acc, current) => {
        const x = acc.find(item => item.collectionId === current.collectionId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setList(filteredArr)
    })
  }

  return (
    <SafeAreaView style={{
      width: "100%",
      height: "100%",
      backgroundColor: '#eeeeee',
      alignSelf: 'center'
    }}>
      <View style={{
        width: "90%",
        margin: 20,
        borderWidth: 1,
        borderColor: 'tomato',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 30
      }}>
        <Image
          style={{
            width: 30,
            height: '100%',
            marginStart: 10,
            resizeMode: 'center'
          }}
          source={require('../../../res/search.png')}
        />
        <TextInput
          placeholder='search'
          style={{
            width: "100%",
            paddingStart: 10
          }}
          value={search}
          onChangeText={(text) => {
            setSearch(text)
          }}
          onSubmitEditing={() => {
            getList()
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{
          width: '100%',
          marginBottom: 20
        }}>
        <View style={{
          width: "90%",
          marginHorizontal: 20,
        }}>
          {list.map((item, index) => {
            return <MainItem key={index} detail={item} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MainScreen