import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';

import './leftnav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/MenuConfig'
import MemoryUtil from '../../utils/MemoryUtils'

const { SubMenu, Item } = Menu;

class LeftNav extends Component {

  // 判断当前用户是否有权限
  hasAuth = (item) => {
    // 取出当前登录的用户
    const user = MemoryUtil.user
    // 取出当前用户拥有的权限列表
    const authList = user.role.menus
    /* 
      1. 当前用户为 admin
      2. 当前用户有权限访问
      3. 当前菜单项是否为公开的
    */

    if (user.username === 'admin' || item.isPublic || authList.indexOf(item.key) !== -1) {
      return true
    } else if (item.children) {
      return item.children.some(menu => authList.indexOf(menu.key))
    }

  }

  // reduce + 递归
  getMenuNodes1 = (menuList) => {
    const openKey = this.props.location.pathname

    return menuList.reduce((pre, item) => {

      if (this.hasAuth(item)) {
        if (!item.children) { // 当前就一级菜单
          pre.push((
            <Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Item>
          ))
        } else { // 有子菜单
          if (item.children.some(item => openKey.startsWith(item.key))) {
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
        }
      }
      return pre;
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
    let SelectedKey = this.props.location.pathname
    const getMenuNodes = this.getMenuNodes
    const openKey = this.openKey

    if (SelectedKey.startsWith('/product')) {
      SelectedKey = '/product'
    }

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