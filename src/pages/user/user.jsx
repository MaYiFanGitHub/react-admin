import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import { reqUserList, reqAddOrUpdateUser, reqDeleteUser } from '../../api'
import { formatTime } from '../../utils/TimeUtil'
import UserForm from './user-form'

const { confirm } = Modal;

export default class User extends Component {

  state = {
    userList: [], // 用户列表
    roles: [], // 权限列表
    isShow: false,
  }

  // 初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: (create_time) => formatTime(create_time)
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => {
          return this.rolesNames[role_id]
        }
      },
      {
        title: '操作',
        render: (user) => (
          <>
            <Button
              type="link"
              onClick={() => this.showUpdateModel(user)}
            >
              编辑
            </Button>
            <Button type="link" onClick={() => this.deleteUser(user._id)}>删除</Button>
          </>
        )
      },
    ]
  }

  // 获取用户列表
  getUserList = async () => {
    const result = await reqUserList()
    if (result.status === 0) {
      const { users, roles } = result.data

      // 根据角色列表生成一个 key 为 角色ID， value 为 角色名的对象
      this.rolesNames = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})
      // 设置状态
      this.setState({
        userList: users,
        roles
      })
    } else {
      message.error('加载失败')
    }
  }

  // 添加或者更新用户
  addOrUpdateUser = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.form.resetFields()
        let user = values

        console.log(this.user)
        if (this.user) {
          user._id = this.user._id
        }

        const result = await reqAddOrUpdateUser(user)

        if (result.status === 0) {
          message.success('操作成功')
          this.getUserList()
          this.setState({
            isShow: false
          })
        } else {
          message.success('操作失败')
        }
      }
    })
  }

  /* 
    删除用户
  */
  deleteUser = (id) => {
    confirm({
      title: '是否要删除此用户',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: async () => {
        const result = await reqDeleteUser(id)
        if (result.status === 0) {
          message.success('删除成功')
          this.getUserList()
        } else {
          message.error('删除失败')
        }
      }
    });
  }

  // 隐藏对话框
  handleCancel = () => {
    this.form.resetFields()
    this.setState({
      isShow: false
    })
  }

  // 显示添加对话框
  showAddModel = () => {
    this.user = null
    this.setState({
      isShow: true
    })
  }
  // 显示修改对话框
  showUpdateModel = (user) => {
    this.user = user;
    this.setState({
      isShow: true
    })
  }

  componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUserList();
  }
  render() {
    const { userList, isShow, roles } = this.state
    const user = this.user || {}

    const title = (
      <Button type="primary" onClick={this.showAddModel}>添加用户</Button>
    )

    return (
      <Card title={title} >
        <Table
          bordered
          dataSource={userList}
          columns={this.columns}
          pagination={{ pageSize: PAGE_SIZE }}
          rowKey="_id"
        >
        </Table>
        <Modal
          title={user._id ? '修改用户' : '添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={this.handleCancel}
        >
          <UserForm user={user} roles={roles} getForm={(form) => this.form = form}></UserForm>
        </Modal>
      </Card>
    )
  }
}
