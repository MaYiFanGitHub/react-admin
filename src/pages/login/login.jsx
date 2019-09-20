import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'

import './css/login.less'
import logo from '../../assets/images/logo.png'
import userUtil from '../../utils/MemoryUtils'
import store from '../../utils/LocalStorageUtil'
import { reqLogin } from '../../api'



class Login extends Component {

  // 提交表单
  handleSubmit = (event) => {
    event.preventDefault()
    /* const { getFieldValue, getFieldsValue } = this.props.form
    const username = getFieldValue('username')
    const pwd = getFieldValue('password')
    console.log(username, pwd);
    console.log(getFieldsValue()); */
    const { validateFields } = this.props.form
    validateFields(async (err, { username, password }) => {
      if (!err) {
        const result = await reqLogin(username, password)
        if (result.status === 0) { // 登录成功
          // 存储到本地存储
          store.set(result.data)
          // 更新存储在内存中的用户信息
          userUtil.user = result.data
          // 跳转到主页
          this.props.history.replace('/')
        } else { // 登录失败
          message.error(result.msg)
        }
      }
    })
  }

  // 自定义验证规则
  formValidate = (rule, value, callback) => {
    // 如果value有值就进行去除首尾空格
    value = value && value.trim()
    if (!value) {
      callback('请输入密码！')
    } else if (value.length < 4) {
      callback('密码长度必须大于4位！')
    } else if (value.length > 12) {
      callback('密码长度必须小于12位！')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }

  componentWillMount() {
    /* 
      判断用户是否已经登录
    */
    if (userUtil.user._id) {
      this.props.history.replace('/')
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: '请输入用户名！' },
                  { min: 4, message: '用户名必须大于4位！' },
                  { max: 12, message: '用户名必须小于12位！' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成！' },
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="请输入用户名"
                />,
              )}
            </Form.Item>

            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { validator: this.formValidate }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                )
              }

            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                block
              >
                登 录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedLogin = Form.create()(Login)
export default WrappedLogin


/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
*/
