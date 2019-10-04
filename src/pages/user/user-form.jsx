import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'

const { Item } = Form
const { Option } = Select

class UserForm extends Component {

  componentWillMount() {
    // 返回当前组件的Form，交给父组件进行验证
    this.props.getForm(this.props.form)
  }

  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator

    const formLayout = {
      wrapperCol: {
        span: 16
      },
      labelCol: {
        span: 4
      }
    }

    return (
      <Form {...formLayout}>
        <Item label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: this.props.user.username,
              rules: [
                { required: true, message: '请输入用户名' }
              ]
            })(
              <Input placeholder="用户名"></Input>
            )
          }
        </Item>
        {
          !this.props.user._id ?
            <Item label="密码">
              {

                getFieldDecorator('password', {
                  initialValue: this.props.user.username,
                  rules: [
                    { required: true, message: '请输入密码' }
                  ]
                })(
                  <Input placeholder="密码"></Input>
                )
              }
            </Item>
            : null
        }
        <Item label="手机">
          {
            getFieldDecorator('phone', {
              initialValue: this.props.user.phone,
              rules: [
                { required: true, message: '请输入手机' }
              ]
            })(
              <Input placeholder="手机"></Input>
            )
          }
        </Item>
        <Item label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: this.props.user.email,
              rules: [
                { required: true, message: '请输入手机' }
              ]
            })(
              <Input placeholder="邮箱"></Input>
            )
          }
        </Item>
        <Item label="角色">
          {
            getFieldDecorator('role_id', {
              initialValue: this.props.user.role_id || "",
              rules: [
                { required: true, message: '请选择角色' }
              ]
            })(
              <Select>
                <Option key="-1" value="">请选择</Option>
                {
                  this.props.roles.map(role => (
                    <Option key={role._id} value={role._id}>{role.name}</Option>
                  ))
                }
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UserForm)