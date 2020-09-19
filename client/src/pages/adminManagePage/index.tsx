import { request } from '@/utils/request';
import { Button, Descriptions, Modal, notification } from 'antd';
import Search from './components/Search';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getLabelByValue } from './controller';
import styles from './index.less';
import { Sex, WantToJoin } from './localFiles/fields';

const index = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const getData = async () => {
    request.get('/api/information/getAll').then(res => {
      if (res && res.data) {
        setDataList(res.data.data);
      }
    });
  };

  const handleDel = async (id: any) => {
    const res = await request.delete(`/api/information/${id}`);
    if (res && res.data.success === true) {
      getData();
      notification.success({ message: '删除成功' });
    }
  };

  const handleSearch = (values: any) => {
    console.log(values);
  };

  const handleRest = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.admin}>
      <h1 className="title">懒得写样式的管理页面</h1>
      <Search onSearch={handleSearch} onReset={handleRest} />
      {dataList.map(item => (
        <div className="card" key={item?.id}>
          <Descriptions
            layout="vertical"
            title={
              <div className="card-title">
                <span>序号：{item?.id}</span>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: '提醒',
                      content: '是否确定删除',
                      onOk: () => {
                        handleDel(item.id);
                      },
                    });
                  }}
                >
                  删除
                </Button>
              </div>
            }
            bordered
          >
            <Descriptions.Item label="姓名">{item?.name}</Descriptions.Item>
            <Descriptions.Item label="性别">
              {getLabelByValue(Sex, item?.sex)}
            </Descriptions.Item>
            <Descriptions.Item label="电话">{item?.phone}</Descriptions.Item>
            <Descriptions.Item label="户籍">{item?.home}</Descriptions.Item>
            <Descriptions.Item label="生日">
              {moment(item.birthday).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="专业班级">
              {item?.class}
            </Descriptions.Item>
            <Descriptions.Item label="加入的部门">
              {getLabelByValue(WantToJoin, item?.want_to_join)}
            </Descriptions.Item>
            <Descriptions.Item label="爱好及特长">
              {item?.hobby}
            </Descriptions.Item>
            <Descriptions.Item span={12} label="对新媒体认识">
              {item?.talk}
            </Descriptions.Item>
            <Descriptions.Item span={12} label="是否有经验">
              {item?.has_exp}
            </Descriptions.Item>
            <Descriptions.Item style={{ width: '50%' }} label="自我介绍">
              {item?.self_introduction}
            </Descriptions.Item>
            <Descriptions.Item style={{ width: '50%' }} label="照片">
              <img
                style={{ maxHeight: '200px' }}
                src={`http://esunr.xyz:9092/upload/${item?.image}`}
                onClick={() => {
                  window.open(`http://esunr.xyz:9092/upload/${item?.image}`);
                }}
              />
            </Descriptions.Item>
          </Descriptions>
        </div>
      ))}
    </div>
  );
};

export default index;
