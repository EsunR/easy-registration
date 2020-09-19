import React, { useEffect, useState } from 'react';
import styles from './index.less';
import background from '@/resource/background.jpg';
import FormComponent from './components/FormComponent';
import { UpOutlined } from '@ant-design/icons';
import 'animate.css';

const index: React.FC<any> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  // const handleTouchEnd = (e: React.TouchEvent) => {
  //   e.persist();
  //   e.preventDefault();
  //   console.log(e.touches);
  //   // const endY = e.touches[0].clientY;
  //   // console.log(endY);
  //   // if (startY - endY > 0) {
  //   //   setShow(true);
  //   // }
  // };

  return (
    <div className={styles.welcomePage}>
      <div className="top-content-wrapper animate__animated animate__fadeInUp">
        <img
          width="100%"
          height="100%"
          src={background}
          className="background"
        />
        <div className="left-top animate__animated animate__fadeInUp">
          SignUp
        </div>
        <div className="bottom-info animate__animated animate__fadeInUp">
          <h1>
            大数据与计算机学院
            <br />
            新媒体招新报名表
          </h1>
          <h2>
            新媒体运营中心隶属于大数据与计算机学院，主要负责学院特色和学风建设，主要运营学院官方公众号。
          </h2>
        </div>

        <div
          className="start-btn animate-float"
          onClick={() => {
            setShow(true);
          }}
        >
          <span>点击进入报名</span>
          <UpOutlined />
        </div>
      </div>

      <FormComponent show={show} />
    </div>
  );
};

export default index;
