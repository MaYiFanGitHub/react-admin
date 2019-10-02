import React, { Component } from 'react'
import { Card, Button, Form, Input, Select, message } from 'antd'

import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import { reqCategory, reqAddOrUpdateProduct } from '../../api'

const { Item } = Form
const { Option } = Select

class ProductAddUpdate extends Component {

  state = {
    categories: []
  }
  // PicturesWall 组件 实例对象
  picRef = React.createRef()
  richRef = React.createRef()

  /* 
    表单提交
  */
  handleSubmit = (event) => {
    // 取消默认事件
    event.preventDefault()
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        // 获取 分类ID， 商品名称， 商品描述，商品价格
        let product = values;
        // 得到 商品图片
        product.imgs = this.picRef.current.getImgNameList();
        // 得到 商品详情
        product.detail = this.richRef.current.getDetail();
        
        // 判断当前是添加商品还是更新商品
        if (this.props.location.state) {
          // 更新商品
          product._id = this.props.location.state._id;
        }

        // 发送请求
        const result = await reqAddOrUpdateProduct(product)
        if (result.status === 0) {
          // 操作成功
          message.success('操作成功')
          this.props.history.replace('/product')
        } else {
          // 操作失败
          message.error('操作失败')
        }

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
      labelCol: { span: 2 },
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
          <Item label="商品图片" wrapperCol={{ span: 12 }}>
            <PicturesWall imgs={product.imgs} ref={this.picRef} />
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 20 }}>
            <RichTextEditor ref={this.richRef} detail={product.desc}></RichTextEditor>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>  
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)