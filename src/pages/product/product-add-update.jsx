import React, { Component } from 'react'
import { Card, Button, Form, Input, Select } from 'antd'
import { reqCategory } from '../../api'

const { Item } = Form
const { Option } = Select

class ProductAddUpdate extends Component {

  state = {
    categories: []
  }

  /* 
    表单提交
  */
  handleSubmit = (event) => {
    // 取消默认事件
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
      }
    })
  }
  /* 
    获取分类列表
  */
  getCategories = async () => {
    const result = await reqCategory()
    if (result.status === 0) {
      this.setState({
        categories: result.data
      })
    }
  }
  /* 
    表单自定义验证规则
  */
  formValidatory = (rule, value, callback) => {
    if (value < 0) {
      callback('商品价格不能小于0')
    } else {
      callback()
    }
  }

  componentDidMount() {
    this.getCategories()
  }
  render() {
    const { categories } = this.state
    const getFieldDecorator = this.props.form.getFieldDecorator
    const product = this.props.location.state || {}
    const title = (
      <>
        <Button type="link" icon="arrow-left" onClick={() => this.props.history.goBack()}></Button>
        <span>
          {
            product._id ? '修改' : '添加'
          }
          商品
        </span>
      </>
    )
    const FormLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 }
    }
    return (
      <Card title={title}>
        <Form onSubmit={this.handleSubmit} {...FormLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  { required: true, message: '请输入商品名称', whitespace: true }
                ]
              })(
                <Input placeholder="商品名称" />
              )
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '请输入商品描述', whitespace: true }
                ]
              })(
                <Input placeholder="商品描述" />
              )
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator('price', {
                initialValue: product.price && ('' + product.price),
                rules: [
                  { required: true, message: '请输入商品价格', whitespace: true },
                  { validator: this.formValidatory }
                ]
              })(
                <Input type="number" placeholder="商品价格" addonAfter="元" />
              )
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryId', {
                initialValue: product.categoryId || '',
                rules: [
                  { required: true, message: '请选择商品分类', whitespace: true }
                ]
              })(
                <Select>
                  <Option value="">请选择</Option>
                  {
                    categories.map(category => <Option value={category._id} key={category._id}>{category.name}</Option>)
                  }
                </Select>
              )
            }
          </Item>
          <Item label="商品图片">
            商品图片
          </Item>
          <Item label="商品详情">
            商品详情
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">添加</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)