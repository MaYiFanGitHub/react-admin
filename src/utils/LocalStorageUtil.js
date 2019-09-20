import store from 'store'

export default {
  // 读取localStorage
  get(){
    return store.get('user_key') || {}
  },
  // 删除 localStorage
  remove(){
    store.remove('user_key')
  },
  // 设置
  set(user){
    store.set('user_key', user)
  }
}