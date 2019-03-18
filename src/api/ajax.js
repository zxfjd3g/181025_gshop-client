/*
用来发送ajax请求的函数模块
函数的返回值是promise
包装axios
自己封装了promise
  1. 希望异步得到的是reponse中的data数据
  2. 统一处理请求错误
 */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {

  return new Promise((resolve, reject) => {
    let promise
    // 执行异步请求
    if(type==='GET') {
      promise = axios.get(url, { // 配置对象
        params: data // 包含所有query请求参数的对象
      })
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      // 成功了, 调用resolve
      resolve(response.data)
    }).catch(error => {
      // 出错了, 调用reject
     // reject(error)
      // 统一处理请求错误
      alert('请求出错: '+error.message)
    })
  })

}

async function login() {
  /*ajax('/login', {name: 'Tom', pwd: '123'}, 'POST').then(response => {
    const result = response.data
    if(result.code===0) {
      // 登陆成功
    } else {
      // 登陆失败
    }
  })*/

  /*const response = await ajax('/login', {name: 'Tom', pwd: '123'}, 'POST')
  const result = response.data*/
  /*try {
    const result = await ajax('/login', {name: 'Tom', pwd: '123'}, 'POST')
  } catch (error) {
    // 显示提示
  }*/

  // const result = await ajax('/login', {name: 'Tom', pwd: '123'}, 'POST')



}