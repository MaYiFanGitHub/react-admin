import store from 'store'
/* 
  将数据存储到内存中，而不用每次去读取 localStorage
*/

export default {
  user: store.get('user_key') || {}, // 用户登录的信息
  product: {}, // 商品信息
}