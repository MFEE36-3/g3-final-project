import React from 'react';
import Forumbtn from '@/components/common/forum/forumbtn';
import styles from './detail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categorykanban from '@/components/common/forum/categorykanban';
import Hotnew from '../../components/common/forum/hotnew';
import Articlelist from '@/components/common/forum/articlelist';
export default function Detail() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className={styles.category}>
              <Forumbtn />
            </div>
          </div>
          <div className="col-10">
            <div className={styles.title}>
              <Categorykanban />

              <Hotnew />
              <Articlelist />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
