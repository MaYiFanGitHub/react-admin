import ajax from './ajax'

// 登录请求
export const reqLogin = (username, password) => ajax({
  method: 'POST',
  url: '/login',
  data: {
    username,
    password
  }
})

export const reqLogin1 = (user_username, user_passowrd) => ajax({
  method: "POST",
  data: {
    user_username,
    user_passowrd
  },
  url: '/login_user'
})