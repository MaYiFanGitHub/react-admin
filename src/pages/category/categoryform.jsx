import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

class CategoryForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }
  render() {
    const { categoryName } = this.props
    return (
      <Form>
        <Item>
          {
            this.props.form.getFieldDecorator('categoryName', {
              initialValue: categoryName,
              rules: [
                { required: true, message: '请输入分类名称', whitespace: true }
              ]
            })(
              <Input
                placeholder="请输入分类名称"
              />
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(CategoryForm)