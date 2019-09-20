import store from 'store'
/* 
  将数据存储到内存中，而不用每次去读取 localStorage
*/

export default {
  user: store.get('user_key') || {}
}