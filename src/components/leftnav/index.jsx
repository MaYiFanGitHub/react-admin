import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './leftnav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/MenuConfig'

const { SubMenu, Item } = Menu;

class LeftNav extends Component {

  // reduce + 递归
  getMenuNodes1 = (menuList) => {

    const openKey = this.props.location.pathname

    return menuList.reduce((pre, item) => {
      if (!item.children) {
        pre.push((
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        ))
        return pre;
      } else { // SubItem

        if (item.children.some(item => openKey === item.key)) {
          this.openKey = item.key
        }
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes1(item.children)}
          </SubMenu>
        ))
        return pre;
      }
    }, [])
  }

  // map + 递归 返回 Item 和 SubMenu 列表
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      // 判断当前列表项是 item 还是 SubItem 
      if (!item.children) { // 当前为 Item 项
        return (
          <Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Item>
        )
      } else { // 当前为 SubItem 项
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }

  /* 
    在第一次render之前执行
    为第一次render执行同步的操作（准备数据）
  */
  componentWillMount() {
    this.getMenuNodes = this.getMenuNodes1(menuList)
  }
  render() {
    const SelectedKey = this.props.location.pathname
    const getMenuNodes = this.getMenuNodes
    const openKey = this.openKey

    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <div>

          <Menu
            mode="inline"
            theme="dark"
            /* defaultSelectedKeys={[SelectedKey]} */
            selectedKeys={[SelectedKey]}
            defaultOpenKeys={[openKey]}
          >
            {getMenuNodes}
          </Menu>
        </div>
      </div>
    )
  }
}

const WrappedLeftNav = withRouter(LeftNav)

export default WrappedLeftNav