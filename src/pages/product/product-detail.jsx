import React, { Component } from 'react'
import { Card, Button, List } from 'antd'

import MemoryUtils from '../../utils/MemoryUtils'
import { reqProduct, reqCategoryById } from '../../api'
import './product.less'
import { IMG_BASE_URL } from '../../utils/constants'

const { Item } = List

export default class ProductDetail extends Component {

  state = {
    product: MemoryUtils.product, // 商品信息
    categoryName: '', // 对应的分类名称
  }
  /* 
    根据ID获取商品信息
  */
  getProduct = async (productId) => {
    const result = await reqProduct(productId);
    if (result.status === 0) {
      this.setState({
        product: result.data
      })
      // 获取对应的分类名称
      this.getCategoryName(result.data.categoryId)
    }
  }
  /* 
    根据ID 获取对应的品类名称
  */
  getCategoryName = async (categoryId) => {
    const result = await reqCategoryById(categoryId)

    if (result.status === 0) {
      this.setState({
        categoryName: result.data.name
      })
    }
  }

  async componentDidMount() {
    const { product } = this.state // 获取 state 里面的 商品对象
    if (!product._id) { // 当 state 里面的商品对象没有值的时候发送请求信息
      const productId = this.props.match.params.id
      this.getProduct(productId)
    } else {
      this.getCategoryName(product.categoryId)
    }
  }

  render() {
    const { product, categoryName } = this.state
    const title = (
      <>
        <Button type="link" icon="arrow-left" onClick={() => this.props.history.goBack()}></Button>
        <span>商品详情</span>
      </>
    )
    return (
      <Card
        title={title}
        className="detail"
      >
        <List>
          <Item>
            <span className="detail-title">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="detail-title">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="detail-title">商品价格:</span>
            <span>{product.price + '元'}</span>
          </Item>
          <Item>
            <span className="detail-title">所属分类:</span>
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="detail-title">商品图片:</span>
            <span className="detail-imgs">
              {
                product.imgs && product.imgs.map(item => (
                  <img src={IMG_BASE_URL + item} key={item} alt="img" />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="detail-title">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          </Item>

        </List>
      </Card >
    )
  }
}
