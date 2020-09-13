import React from 'react';
import { Link, Router } from 'umi';
import styles from './index.less';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Build By Dva</h1>
      <h2>懒得做索引页了，就这样吧</h2>
      <ul>
        <li>
          <Link to="/welcome">欢迎页面</Link>
        </li>
        <li>
          <Link to="/admin">管理页面</Link>
        </li>
      </ul>
    </div>
  );
};
