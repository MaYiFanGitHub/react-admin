import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import PropTypes from 'prop-types'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  constructor(props) {
    super(props)
    /* 
     设置编辑器的初识状态
   */
    const detail = this.props.detail;
    if (detail) {
      const contentBlock = htmlToDraft(detail);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        };
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }
  }

  /* 
    上传图片
  */
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        // 获取 xhr 异步请求对象
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        // 发送的数据
        const data = new FormData();
        data.append('image', file);
        // 发送ajax请求
        xhr.send(data);
        // 监听load事件
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          // 在上传读取的图片地址为 response.data.url
          resolve(response);
        });
        // 错误处理
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }


  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  /* 
    返回输入的内容
  */
  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          editorStyle={{ border: '1px solid #000', height: 500, paddingLeft: 20 }}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
      </div>
    );
  }
}