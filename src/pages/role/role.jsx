import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import { formatTime } from '../../utils/TimeUtil'
import AddForm from './add-form'
import UpdateForm from './update-form'
import { reqRoleList, reqAddRole } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

export default class Home extends Component {
  state = {
    roleList: [],
    addRoleModal: false, // 添加角色对话框
    addAuthModal: false, // 权限对话框
  }

  setAuthComponent = React.createRef();

  /* 
    获取角色列表
  */
  getRoleList = async () => {
    const result = await reqRoleList()
    if (result.status === 0) {
      this.setState({
        roleList: result.data
      })
    }
  }

  /* 
    显示添加角色对话框
  */
  showRoleModal = () => {
    this.setState({
      addRoleModal: true
    })
  }
  /* 
    显示设置权限对话框
  */
  showAuthModal = (auth) => {
    this.auth = auth
    this.setState({
      addAuthModal: true
    })
  }
  /* 
    添加角色
  */
  addRole = () => {
    this.addForm.validateFields(async (err, { roleName }) => {
      if (!err) {
        const result = await reqAddRole(roleName)
        this.addForm.resetFields() // 表单重置
        if (result.status === 0) { // 添加成功后的操作
          message.success('添加成功')
          const roleList = this.state.roleList
          const role = result.data
          this.setState({
            roleList: [...roleList, role], // 更新角色列表
            addRoleModal: false, // 取消对话框的显示
          })
        } else {
          message.error('添加失败')
        }
      }
    })
  }

  /* 
    设置权限
  */
  addAuth = () => {
    console.log(this.auth)
    // 权限列表
    console.log(this.setAuthComponent.current.getAuthList())
  }

  /* 
    取消对话框的显示
  */
  handleCancel = () => {
    this.setState({
      addRoleModal: false,
      addAuthModal: false
    })
    //this.addForm.resetFields() // 表单重置
  }

  componentDidMount() {
    this.getRoleList()
  }

  componentWillMount() {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formatTime(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => formatTime(auth_time)
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '操作',
        render: (auth) => (
          <Button
            type="link"
            onClick={() => this.showAuthModal(auth)}
          >
            设置权限
          </Button>
        )
      }
    ]
  }

  render() {
    const { roleList, addRoleModal, addAuthModal } = this.state
    const title = <Button type="primary" onClick={this.showRoleModal}>创建角色</Button>
    const columns = this.columns

    return (
      <Card title={title}>
        <Table
          dataSource={roleList}
          columns={columns}
          bordered
          rowKey="_id"
          pagination={{ pageSize: PAGE_SIZE }}
        >
        </Table>
        <Modal
          title="添加角色"
          visible={addRoleModal}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddForm getAddForm={(form) => this.addForm = form}></AddForm>
        </Modal>
        <Modal
          title="设置权限"
          visible={addAuthModal}
          onOk={this.addAuth}
          onCancel={this.handleCancel}
        >
          <UpdateForm auth={this.auth} ref={this.setAuthComponent} />
        </Modal>
      </Card>
    )
  }
}
