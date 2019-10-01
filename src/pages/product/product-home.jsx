import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Table
} from 'antd'

import { reqProducts, reqSearchProducts } from '../../api'

const { Option } = Select

export default class ProductHome extends Component {
  state = {
    products: [], // 商品列表
    total: 0, // 商品总数
    searchType: 'productName', // 搜索类型
    searchName: '' // 搜索名
  }

  /* 
    分页获取商品列表
  */
  getProducts = async (pageNum) => {
    this.current = pageNum; // 保存当前页
    let result;
    if (!this.search) {
      result = await reqProducts(pageNum, 2)
    } else {
      const { searchType, searchName } = this.state
      result = await reqSearchProducts({ pageNum, pageSize: 2, searchType, searchName })
    }

    if (result.status === 0) {
      this.setState({
        products: result.data.list,
        total: result.data.total
      })
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
        render: () => (
          <>
            <Button type="primary">下架</Button>
            <span>在售</span>
          </>
        )
      },
      {
        title: '操作',
        width: 100,
        render: () => (
          <>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
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
    const { products, total, searchType, searchName } = this.state

    const title = (
      <div>
        <Select 
          value={searchType}
          onChange={ (value) => this.setState({ searchType: value})}
        >
          <Option key="1" value="productName">按名称搜索</Option>
          <Option key="2" value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          placeholder="请输入名称进行搜索" 
          style={{ width: 200, margin: '0 15px' }} 
          value={searchName}
          onChange={ (e) => this.setState({ searchName: e.target.value})}
        />
        <Button 
          type="primary"
          onClick= { () => {
            this.search = true // 判断是否点击了搜索按钮
            this.getProducts(1)
          }}
        >
          搜索
        </Button>
      </div>
    )
    const extra = (
      <Button type="primary" icon="plus">添加</Button>
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
          pagination={{
            pageSize: 3,
            total,
            onChange: this.getProducts,
            current: this.current
          }}
        />
      </Card>
    )
  }
}
