/* 
  包含 n 个 reducer函数的模块
  reducer 函数的作用： 根据旧的state和 action，生成并返回一个新的state
*/
import {
  combineReducers
} from 'redux'

import {
  SET_HEADER_TITLE,
  LOGOUT,
  RECEIVE_USER,
  SHOW_MSG
} from './action-types'

import LocalStorageUtil from '../utils/LocalStorageUtil'

/* 
  头部标题
*/
const initHeaderTitle = '首页'

function headerTitle(state = initHeaderTitle, action) {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return action.headerTitle
    default:
      return state
  }
}

/* 
  用户 state
*/
const initUser = LocalStorageUtil.get()

function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER: // 设置一个user
      return action.user
    case LOGOUT: // 退出登录
      return {}
    case SHOW_MSG:
      return {
        msg: action.msg
      }
    default:
      return state
  }
}

/* 
  管理的 状态为一个对象
  {
    reducer函数名: 状态值，
    reducer函数名: 状态值，
    ....
  }
*/
export default combineReducers({
  headerTitle,
  user
})