/* 
  包含多个 action creator 函数的模块
*/
import { SET_HEADER_TITLE, LOGOUT, RECEIVE_USER, SHOW_MSG } from './action-types'
import LocalStorageUtil from '../utils/LocalStorageUtil'
import { reqLogin } from '../api'


// 设置header标题
export const setHeaderTitle = (headerTitle) => ({ type: SET_HEADER_TITLE, headerTitle })

// 退出同步
export const logout = () => {
  // 清除 本地缓存中的状态
  LocalStorageUtil.remove()
  // 返回 action 对象
  return { type: LOGOUT }
}

// 显示提示信息
export const showMsg = (msg) => ({type: SHOW_MSG, msg})

const receiveUser = (user) => ({type: RECEIVE_USER, user})

// 登录
export function login(username, password) {
  
  return async dispatch => {
    // 1. 执行异步代码
    const result = await reqLogin(username, password)
    if (result.status === 0) { // 登录成功
      const user = result.data
      // 将用户信息存放在本地存储
      LocalStorageUtil.set(user)
      // 分发接收user的同步 action
      dispatch(receiveUser(user))
    } else { // 登录失败
      dispatch(showMsg(result.msg))
    }
  }
}