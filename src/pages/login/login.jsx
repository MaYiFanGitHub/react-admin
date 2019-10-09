import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { login } from '../../redux/actions'
import './css/login.less'
import logo from '../../assets/images/logo.png'



class Login extends Component {
  // 提交表单
  handleSubmit = (event) => {
    event.preventDefault()
    const { validateFields } = this.props.form
    validateFields(async (err, { username, password }) => {
      if (!err) {
        this.props.login(username, password)
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

  render() {
    /* 
      判断用户是否已经登录
    */
    if (this.props.user._id) {
      return <Redirect to='/'></Redirect>
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          { this.props.user.msg ? <div style={{color: 'red', textAlign: 'center', position: 'absolute', left: 0, top: 0, width: '100%'}}>{this.props.user.msg}</div> : null }
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
export default Form.create()(connect(
  state => ({
    user: state.user
  }),
  { login }
)(Login))


/*
用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
*/
