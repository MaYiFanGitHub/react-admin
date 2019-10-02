import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table,
  message
} from 'antd'

import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import MemoryUtils from '../../utils/MemoryUtils'
import { PAGE_SIZE } from '../../utils/constants'

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    products: [], // 商品列表
    total: 0, // 商品总数
    searchType: 'productName', // 搜索类型
    searchName: '', // 搜索名
    loading: true
  }

  /* 
    分页获取商品列表
  */
  getProducts = async (pageNum) => {
    const { searchType, searchName } = this.state // 搜索类型和搜索内容
    let result;  // 发送 ajax 请求后的结果
    this.current = pageNum; // 保存当前页
    this.setState({ // 设置加载效果
      loading: true
    })
    if (!this.search && !this.searchName) {
      result = await reqProducts(pageNum, PAGE_SIZE)
    } else {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchType, searchName })
    }

    if (result.status === 0) {
      this.setState({
        products: result.data.list,
        total: result.data.total,
        loading: false // 取消加载效果
      })
    }
  }

  /* 
    更新商品状态
  */
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    this.setState({ // 设置加载效果
      loading: true
    })
    if (result.status === 0) {
      message.success('更新成功！')
      this.getProducts(this.current)
    } else {
      message.error('更新失败！')
    }
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price
      },
      {
        title: '状态',
        width: 100,
        render: ({ _id, status }) => {

          let btnText = '上架'
          let text = '已下架'

          if (status === 2) {
            btnText = '下架'
            text = '在售'
          }

          return (
            <>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
              >
                {btnText}
              </Button>
              <span>{text}</span>
            </>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <>
            <Button
              type="link"
              onClick={() => {
                MemoryUtils.product = product
                this.props.history.push(`/product/detail/${product._id}`)
              }}
            >
              详情
            </Button>
            <Button 
              type="link"
              onClick={ () => {
                this.props.history.push('/product/addupdate', product)
              }}
            >
              修改
            </Button>
          </>
        )
      }
    ]
  }

  componentDidMount() {
    // 获取商品列表
    this.getProducts(1);
  }

  render() {
    const { products, total, searchType, searchName, loading } = this.state

    const title = (
      <div>
        <Select
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option key="1" value="productName">按名称搜索</Option>
          <Option key="2" value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="请输入名称进行搜索"
          style={{ width: 200, margin: '0 15px' }}
          value={searchName}
          onChange={(e) => this.setState({ searchName: e.target.value })}
        />
        <Button
          type="primary"
          onClick={() => {
            this.search = true // 判断是否点击了搜索按钮
            this.getProducts(1)
          }}
        >
          搜索
        </Button>
      </div>
    )
    const extra = (
      <Button type="primary" icon="plus" onClick={() => this.props.history.push('/product/addupdate')}>添加</Button>
    )

    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table
          dataSource={products}
          columns={this.columns}
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: PAGE_SIZE,
            total,
            onChange: this.getProducts,
            current: this.current
          }}
        />
      </Card>
    )
  }
}
