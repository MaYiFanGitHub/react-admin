import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'

import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api'
import CategoryForm from './categoryform'

export default class Category extends Component {

  state = {
    categories: [], // 分类列表
    loading: true, // 加载效果
    showStatus: 0, // 对话框显示， 0 不显示， 1：添加对话框， 2：修改对话框
  }

  /* 
    获取到所有的分类列表
  */
  getCategories = async () => {
    const result = await reqCategory()
    if (result.status === 0) { // 获取成功
      // 设置state
      this.setState({
        categories: result.data,
        loading: false
      })
      // 加载效果
    } else {
      // 获取失败
      message.error(result.msg || '获取分类列表失败')
    }
  }

  // 添加分类
  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields()
        const result = await reqAddCategory(values.categoryName)
        if (result.status === 0) { // 添加成功
          message.success('添加成功')
          this.getCategories()
          this.setState({
            showStatus: 0
          })
          console.log('添加成功： ' + this.form.getFieldValue('categoryName'))
        } else { // 添加失败
          message.error(result.msg || '添加失败')
          console.log('添加失败： ' + this.form.getFieldValue('categoryName'))
        }
      }
    })
  }

  // 更新分类
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // 获取到当前的ID
        values.categoryId = this.category._id
        console.log(values)
        const result = await reqUpdateCategory(values)
        if (result.status === 0) { // 修改成功
          message.success('修改成功')
          this.getCategories()
          this.setState({
            showStatus: 0
          })
          console.log('更新成功： ' + this.form.getFieldValue('categoryName'))
        } else { // 修改失败
          message.error(result.msg || '修改失败')
          console.log('更新失败： ' + this.form.getFieldValue('categoryName'))
        }
      }
    })
  }

  // 显示添加对话框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  // 显示修改对话框
  showUpdate = (category) => {
    this.category = category;
    this.setState({
      showStatus: 2
    })
  }

  // 关闭对话框
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
    // 初始化 form 表单
    this.form.resetFields()
    console.log('关闭对话框： ' + this.form.getFieldValue('categoryName'))
  }

  componentWillMount() {
    // 表格列名
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 250,
        dataIndex: '',
        key: 'x',
        render: (category) => <Button type="link" onClick={() => this.showUpdate(category)}>修改分类</Button>
      },
    ];
  }

  componentDidMount() {
    // 异步获取全部的分类列表
    this.getCategories()
  }

  render() {
    // 添加按钮组件
    const addButton = <Button onClick={this.showAdd} type="primary" icon="plus">添加</Button>;
    // 读取state中的数据
    const { categories, loading, showStatus } = this.state
    // 读取this中的数据
    const category = this.category || {}
    return (
      <Card extra={addButton}>

        <Table
          dataSource={categories}
          columns={this.columns}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 8, showQuickJumper: true }}
          loading={loading}
          style={{ width: 900, margin: '0 auto' }}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          okText="添加"
          cancelText="取消"
        >
          <CategoryForm setForm={(form) => this.form = form} />
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          okText="修改"
          cancelText="取消"
        >
          <CategoryForm
            categoryName={category.name}
            setForm={(form) => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}
