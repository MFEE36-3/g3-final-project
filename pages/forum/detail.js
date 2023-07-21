import React from 'react';
import Forumbtn from '@/components/common/forumbtn';
import styles from './detail.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Categorykanban from '@/components/common/categorykanban';
import Hotnew from '@/components/common/hotnew';
import Articlelist from '@/components/common/articlelist';
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
              <Articlelist />
              <Articlelist />
              <Articlelist />
              <Articlelist />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
