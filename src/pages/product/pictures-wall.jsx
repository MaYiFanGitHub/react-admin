import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd';

import { reqDeletePicture } from '../../api'
import { IMG_BASE_URL } from '../../utils/constants';

/* 
  对图片进行 64 位编码
*/
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  /* 
    指定接收参数的类型
  */
  static propTypes = {
    imgs: PropTypes.array
  }
  constructor(props) {
    super(props)

    let fileList = []
    const imgs = this.props.imgs
    
    if (imgs && imgs.length > 0) {
      fileList = this.props.imgs.map( (img, index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: IMG_BASE_URL + img,
      }))
    }

    /* 设置 state 状态 */
    this.state = {
      previewVisible: false, // 大图片的对话框是否进行显示
      previewImage: '', // 大图片的URL
      fileList: fileList, // 已经上传的图片列表
    }
  }



  /* 
    隐藏对话框的显示
  */
  handleCancel = () => this.setState({ previewVisible: false });

  /* 
    显示对话框
  */
  handlePreview = async file => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
    上传文件的回调
  */
  handleChange = async ({ file, fileList }) => {
    /* 
      上传图片完毕，把响应体里面的 name， 和 url 重新赋值给 file， 注意 file 和 fileList数组最后一个元素的指向问题
    */
    if (file.status === 'done') {
      file = fileList[fileList.length - 1];
      file.url = file.response.data.url
      file.name = file.response.data.name
    }

    /* 
      删除图片的时候回调
    */
    if (file.status === 'removed') {
      const result = await reqDeletePicture(file.name)
      if (result.status === 0) {
        message.success('删除图片成功！')
      } else {
        message.error('删除图片失败！')
      }
    }
    // 更新上传文件的列表
    this.setState({ fileList })
  }

  /* 
    返回图片名称列表的数组
  */
  getImgNameList = () => {
    return this.state.fileList.map( file => file.name)
  }


  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload" /* 图片上传地址 */
          name="image" /* 发到后台的文件参数名	 */
          listType="picture-card" /* 上传图片的样式类型 */
          fileList={fileList} /* 已经上传的文件列表 */
          onPreview={this.handlePreview} /* 点击 预览小眼睛时候，触发该回调 */
          onChange={this.handleChange} /* 改变的时候触发该回调 */
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>

        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}