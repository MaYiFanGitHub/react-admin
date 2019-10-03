import React, { Component } from 'react'
import { Form, Input } from 'antd'

const { Item } = Form

class AddForm extends Component {

  componentWillMount() {
    // 将本组件的 form 方法传递给父级
    this.props.getAddForm(this.props.form)
  }
  render() {
    const getFieldDecorator = this.props.form.getFieldDecorator

    const FormLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    }
    return (
      <Form {...FormLayout}>
        <Item label="角色名称">
          {
            getFieldDecorator('roleName', {
              initialValue: '',
              rules: [
                { required: true, message: '请输入角色名称' }
              ]
            })(
              <Input placeholder="角色名称" />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)