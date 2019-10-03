import React, { Component } from 'react'
import { Form, Input, Tree } from 'antd'

import MenuList from '../../config/MenuConfig'

const { Item } = Form
const { TreeNode } = Tree

class UpdateForm extends Component {
  state = {
    authList: this.props.auth.menus
  }
  /*  */
  getAuthListNode = (menuList) => {
    return menuList.map(menu => (
      <TreeNode title={menu.title} key={menu.key}>
        {
          menu.children ? this.getAuthListNode(menu.children) : null
        }
      </TreeNode>
    ))
  }
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
    console.log(props)
    this.setState({
      authList: props.auth.menus
    })
  }
  render() {
    const { authList } = this.state
    const getFieldDecorator = this.props.form.getFieldDecorator
    const FormLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 }
    }
    return (
      <>
        <Form {...FormLayout}>
          <Item label="角色名称">
            {
              getFieldDecorator('name', {
                initialValue: this.props.auth.name
              })(
                <Input disabled></Input>
              )
            }
          </Item>
          <Item>
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
          </Item>
        </Form>
      </>
    )
  }
}

export default Form.create()(UpdateForm)