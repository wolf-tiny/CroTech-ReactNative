import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  TextInput,
  Image,
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { requestGet } from '../../utils/APIUtils'
import { API_APPLE_MISIC_URL } from '../../constants/Constants'

import MainItem from '../../components/item/MainItem'
import LabelItem from '../../components/item/LabelItem'

const emptyArray = [{ name: 'A' }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "E" }]

const MainScreen = () => {

  const [list, setList] = useState(emptyArray)
  const [search, setSearch] = useState('')
  const [second, setSecond] = useState(0)

  useEffect(() => {
    getList()

    const timer = setInterval(() => {
      setSecond(content => content + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setList(content => content.slice(1).concat(content[0]))
  }, [second])

  const getList = () => {
    if (list.length !== 5) {
      setList(content => content.filter(item => item.name !== undefined))
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
      setList(content => tempList.length !== 0 ? content.concat(filteredArr.slice(0, 5)) : content)
    })
  }

  return (
    <SafeAreaView style={styles.full_size}>
      <View style={styles.full_under_size}>
        <Image
          style={styles.search_img}
          source={require('../../../res/search.png')}
        />
        <TextInput
          placeholder='search'
          style={styles.search_input}
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
        style={styles.scroll_size}>
        <View style={styles.scroll_under_size}>
          {list.map((item, index) => {
            return index > 4 ? <View key={index}></View> : item.name !== undefined ?
              <LabelItem key={index} detail={item.name} /> :
              <MainItem key={index} detail={item} />
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  full_size: {
    width: "100%",
    height: "100%",
    backgroundColor: '#eeeeee',
    alignSelf: 'center'
  },
  full_under_size: {
    width: "90%",
    margin: 20,
    borderWidth: 1,
    borderColor: 'tomato',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 30
  },
  search_img: {
    width: 30,
    height: '100%',
    marginStart: 10,
    resizeMode: 'center'
  },
  search_input: {
    width: "100%",
    paddingStart: 10
  },
  scroll_size: {
    width: '100%'
  },
  scroll_under_size: {
    width: "90%",
    marginHorizontal: 20,
  }
})

export default MainScreen