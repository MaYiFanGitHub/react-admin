import {
  INCREMENT,
  DECREMENT
} from './action-types'

/* 
  同步增加 action
*/
export const increment = (number) => ({
  type: INCREMENT,
  number
})
/* 
  同步增加 action
*/
export const decrement = (number) => ({
  type: DECREMENT,
  number
})

/* 
  异步增加的 action
*/
export const incrementAsync = function (number) {
  return (dispatch) => { // 返回值是一个函数，形参列表为一个dispatch
    // 1. 执行异步代码
    setTimeout(() => {
      // 2. 分发同步action
      dispatch(increment(number))
    }, 1000);
  }
}