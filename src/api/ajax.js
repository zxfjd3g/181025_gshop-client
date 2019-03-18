/*
用来发送ajax请求的函数模块
函数的返回值是promise
包装axios
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {

  if(type==='GET') {
    return axios.get(url, { // 配置对象
      params: data // 包含所有query请求参数的对象
    })
  } else {
    return axios.post(url, data)
  }
}