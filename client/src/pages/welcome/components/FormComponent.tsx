import {
  Button,
  DatePicker,
  Input,
  message,
  Radio,
  Upload,
  Form,
  Modal,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import styles from '../index.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import Axios from 'axios';
import { request } from '@/utils/request';

const FormComponent: React.FC<{
  show: boolean;
}> = ({ show }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();

  function getBase64(img: any, callback: Function) {
    const reader = new FileReader();
    if (img) {
      reader.readAsDataURL(img);
      reader.addEventListener('load', () => callback(reader.result));
    }
  }

  function beforeUpload(file: File) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能选取图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 6;
    if (!isLt2M) {
      message.error('上传图片必须小于6M');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = (info: UploadChangeParam) => {
    if (info && info.fileList) {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setImageUrl(imageUrl);
      });
      setFileList(info.fileList);
    }
  };

  const uploadFile = async (file: File, fileName: string) => {
    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('file', file);
    return Axios.post('http://esunr.xyz:9092/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (fileList && fileList.length) {
        const file = fileList[0];
        const fileName = file.uid;
        const uploadRes = await uploadFile(
          file.originFileObj as File,
          fileName,
        );
        if (uploadRes.status === 200) {
          // post 表单
          const cpValues = JSON.parse(JSON.stringify(values));
          cpValues.image = fileName;
          const res = await request.post('/api/information/addInfo', cpValues);
          if (res && res.data && res.data.success) {
            Modal.success({
              content: '提交成功，我们期待你的加入',
              onOk: () => {
                form.resetFields();
              },
            });
          }
        } else {
          message.error('图片上传失败，服务器坚持不住了，请上传张小点的图片吧');
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div
      className={styles.form}
      style={{
        transform: show ? 'translateY(-100%)' : 'translateY(0%)',
        overflow: loading ? 'hidden' : 'scroll',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          opacity: 0.5,
          position: 'fixed',
          zIndex: 999999,
          fontWeight: 'bold',
          fontSize: 24,
          display: loading ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        提交中......
      </div>
      <Form
        className="form"
        labelCol={{ style: { margin: '20px 0', color: 'rgba(0,0,0,0.8)' } }}
        form={form}
        onFinish={values => {
          handleSubmit(values);
        }}
      >
        <FormItem
          name="name"
          label="1.姓名"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="sex"
          label="2.性别"
          required
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="phone"
          label="3.手机号"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="qq"
          label="4.您常用的QQ"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="birthday"
          label="5.出生年月"
          required
          rules={[{ required: true }]}
        >
          <DatePicker locale={locale} placeholder="请选择" />
        </FormItem>
        <FormItem
          name="class"
          label="6.专业班级"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="home"
          label="7.籍贯"
          required
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="hobby"
          label="8.爱好及特长"
          required
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入" />
        </FormItem>
        <FormItem
          name="want_to_join"
          label="9.您想要加入的部门"
          required
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1}>编采部</Radio>
            <Radio value={2}>运营部</Radio>
            <Radio value={3}>技术部</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="talk"
          label="10.谈谈你对新媒体的认识"
          required
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入" />
        </FormItem>
        <FormItem
          name="has_exp"
          label="11.有无操作微信公众号，ps、pr等办公软件经验"
          required
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入" />
        </FormItem>
        <FormItem
          name="self_introduction"
          label="12.介绍一下你自己吧"
          required
          rules={[{ required: true }]}
        >
          <TextArea placeholder="请输入" />
        </FormItem>

        <FormItem
          name="image"
          label="13.上传一张你自己的照片吧"
          required
          rules={[{ required: true }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChange}
            beforeUpload={beforeUpload}
            fileList={fileList}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </FormItem>

        <Button
          onClick={() => {
            setFileList([]);
            setImageUrl('');
          }}
        >
          删除图片
        </Button>

        <Button
          onClick={() => {
            form.submit();
          }}
          type="primary"
          style={{ width: '100%', margin: '40px 0' }}
        >
          提交
        </Button>
      </Form>

      <div className="bottom-message">新媒体部 提供技术支持</div>
    </div>
  );
};

export default FormComponent;
