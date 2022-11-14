import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native'
import GlobalState from "../mobx/GlobalState"
import Loading from '../components/dialog/Loading'

async function request(options) {
  let headers = {
    "Content-Type": "application/x-www-form-urlencodedcharset=UTF-8",
    "Accept": "application/json",
    "App-Version-Name": DeviceInfo.getVersion(),
    "App-Version-Code": DeviceInfo.getBuildNumber(),
    // "$client_type": Platform.OS == "android" ? "android" : "ios",
    "X-Access-Token": GlobalState.accessToken
  }

  let defaults = { headers: headers }
  const options1 = Object.assign({}, defaults, options)

  Loading.show()

  let firstResponse = await fetch(options1.url, options1).catch(error => {
    Loading.hide()
    throw Error(error)
  })

  Loading.hide()
  let resultTxt = await firstResponse.clone().text()
  if (firstResponse.ok) {
    let result = await firstResponse.json()
    return result
  } else {
    throw Error(resultTxt)
  }
}

export function requestGet(url, param = null) {
  let queryString = new URLSearchParams()
  if (param !== undefined && param != null)
    for (let key in param) {
      queryString.append(key, param[key])
    }

  let options = {
    url: url + "?" + queryString.toString(),
    method: "GET"
  }
  return request(options)
}

export function requestPost(url, param = null) {
  let options = {
    url: url,
    method: "POST"
  }

  if (param !== undefined && param != null) {
    var formBody = []
    for (var property in param) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(param[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    options.body = formBody.join("&")
  }

  return request(options)
}

export async function requestUpload(url, file_uri) {
  let formData = new FormData()

  if (Array.isArray(file_uri)) {
    file_uri.forEach(uri => {
      let fileType = uri.substring(uri.lastIndexOf(".") + 1)
      let file = {
        fileName: uri.replace(/^.*[\\\/]/, ""),
        type: `image/jpeg`,
        uri: uri // file:///storage/emulated/0/Pictures/Hire/hire_34852646.jpg
      }

      formData.append("file", {
        name: file.fileName,
        type: file.type,
        uri: Platform.OS === "android" ? "file://" + file.uri : file.uri.replace("file://", "")
      })
    })
  } else {
    let fileType = file_uri.substring(file_uri.lastIndexOf(".") + 1)
    let file = {
      fileName: file_uri.replace(/^.*[\\\/]/, ""),
      type: `image/jpeg`,
      uri: file_uri // file:///storage/emulated/0/Pictures/Hire/hire_34852646.jpg
    }

    formData.append("file", {
      name: file.fileName,
      type: file.type,
      uri: Platform.OS === "android" ? "file://" + file.uri : file.uri.replace("file://", "")
    })
  }

  let options = {
    url: url,
    method: "POST",
    body: formData
  }

  let headers = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "X-Access-Token": GlobalState.accessToken
  }

  let defaults = { headers: headers }
  const options1 = Object.assign({}, defaults, options)
  Loading.show()
  let firstResponse = await fetch(options1.url, options1).catch(error => {
    Loading.hide()
    throw Error(error)
  })
  console.log("@@@@@@@@Response: " + JSON.stringify(firstResponse))
  Loading.hide()
  let result = await firstResponse.json()
  console.log(">>>>>>>>> REPONSE SUCCESS <<<<<<<<<<")
  console.log(result)

  if (firstResponse.ok) {
    return result
  } else {
    throw Error(result.result_msg)
  }
}
