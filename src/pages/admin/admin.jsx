import React, { Component } from 'react'

import userUtil from '../../utils/MemoryUtils'

export default class Admin extends Component {

  componentWillMount() {
    /* 
      判断用户是否已经登录
    */
    if (!userUtil.user._id) {
      this.props.history.replace('/login')
    }
  }
  render() {
    return (
      <div>
        Admin, {userUtil.user._id}
      </div>
    )
  }
}
