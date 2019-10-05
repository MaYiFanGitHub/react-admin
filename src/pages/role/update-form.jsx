import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'

import MenuList from '../../config/MenuConfig'

const { Item } = Form
const { TreeNode } = Tree

export default class UpdateForm extends Component {
  state = {
    authList: this.props.auth.menus
  }

  /* 生成权限菜单节点 */
  getAuthListNode = (menuList) => {

    return menuList.reduce((pre, menu) => {
      if (!menu.isPublic) {
        pre.push(
          <TreeNode title={menu.title} key={menu.key}>
            {menu.children ? this.getAuthListNode(menu.children) : null}
          </TreeNode>
        )
      }
      return pre
    }, [])
  }
  /* 更新权限列表 */
  onCheck = (authList) => {
    this.setState({
      authList
    })
  };

  /* 
    返回权限列表
  */
  getAuthList = () => this.state.authList

  componentWillReceiveProps(props) {
    this.setState({
      authList: props.auth.menus
    })
  }
  render() {
    const { authList } = this.state
    const FormLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return (
      <>
        <Form {...FormLayout}>
          <Item label="角色名称">
            <Input disabled value={this.props.auth.name}></Input>
          </Item>
        </Form>
        <Tree
          checkable
          checkedKeys={authList}
          defaultExpandAll
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {
              this.getAuthListNode(MenuList)
            }
          </TreeNode>
        </Tree>

      </>
    )
  }
}