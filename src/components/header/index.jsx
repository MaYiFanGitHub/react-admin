import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import jsonp from 'jsonp'
import { Button, Modal } from 'antd'

import menuList from '../../config/MenuConfig'
import MemoryUtil from '../../utils/MemoryUtils'
import LocalStorageUtil from '../../utils/LocalStorageUtil'
import { formatTime } from '../../utils/TimeUtil'
import './header.less'

class Header extends Component {

  state = {
    currentTime: formatTime(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  // 从内存工具中取出当前登录的用户
  getLoginUser = () => {
    this.userName = MemoryUtil.user.username
  }
  // 根据请求的path得到对应的标题
  getTitle = () => {
    let title = '';
    const pathname = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === pathname) {
        title = item.title
      } else if (item.children) {
        const menu = item.children.find(menu => pathname === menu.key)
        // 判断是否有当前菜单
        if (menu) {
          title = menu.title
        }
      }
    })

    return title
  }

  // 当前时间
  getTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        currentTime: formatTime(Date.now())
      })
    }, 1000)
  }

  // 获取当前天气情况
  getWeather = (city) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];

        this.setState({
          dayPictureUrl,
          weather
        })
      }
    })
  }

  // 退出
  logout = () => {
    Modal.confirm({
      title: '是否要退出登录?',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        // 清除本地存储
        LocalStorageUtil.remove()
        // 清除内存中存储的用户值
        MemoryUtil.user = {}
        // 跳转到login页面
        this.props.history.replace('/login')
      }
    })
  }

  componentWillMount() {
    // 获取登录的用户信息
    this.getLoginUser()
  }

  componentDidMount() {
    // 异步获取当前的天气
    this.getWeather('秦皇岛');
    // 显示当前的时间
    this.getTime()
  }

  componentWillUnmount() {
    // 在组件即将卸载的时候，清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const { userName } = this
    const title = this.getTitle()
    const { currentTime, dayPictureUrl, weather } = this.state

    return (
      <div className="header">
        <div className="header-top">
          欢迎，{userName} &nbsp;&nbsp;
          <Button type="link" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <h2>{title}</h2>
          </div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            {dayPictureUrl ? <img src={dayPictureUrl} alt="weather" /> : null}
            <span>{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)