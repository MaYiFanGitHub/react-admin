import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import jsonp from 'jsonp'
import { Button, Modal } from 'antd'
import { connect } from 'react-redux'

import { logout } from '../../redux/actions'
import menuList from '../../config/MenuConfig'
import { formatTime } from '../../utils/TimeUtil'
import './header.less'

class Header extends Component {

  state = {
    currentTime: formatTime(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  // 根据请求的path得到对应的标题
  getTitle = () => {
    let title = '';
    const pathname = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === pathname) {
        title = item.title
      } else if (item.children) {
        const menu = item.children.find(menu => pathname.startsWith(menu.key))
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
        this.props.logout()
      }
    })
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
    
    const { username } = this.props.user
    // const title = this.getTitle()
    const title = this.props.headerTitle
    const { currentTime, dayPictureUrl, weather } = this.state

    return (
      <div className="header">
        <div className="header-top">
          欢迎，{username} &nbsp;&nbsp;
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

export default withRouter(connect(
  state => ({
    headerTitle: state.headerTitle,
    user: state.user
  }),
  { logout }
)(Header))