import React from 'react';
import MemBar from '@/components/common/member/mem-bar';
import MemMoneyCard from '@/components/common/member/mem-moneyCard';
import MemMoneyRecord from '@/components/common/member/mem-moneyRecord';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-money.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function Index() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.area0}>
            <div className={styles2.area1}>
              <div className={styles.title}>我的錢包</div>

              <div className={styles2.nowMoney}>NT$ 7414 元</div>
              <div className={styles2.inputArea}>
                <label className={styles2.label}>
                  <div className={styles2.title}>儲值</div>
                  <input type="number" className={styles2.input}></input>
                </label>
                <button className={styles2.btn}>確認</button>
              </div>
            </div>
            <div className={styles2.imgArea}>
              <div className={styles2.imgText}>您的尊榮會員還有 21 天到期</div>
            </div>
          </div>
          <div>
            <div className={styles2.area2}>
              <div className={styles.title}>會員升級</div>
              <MemMoneyCard />
              <div className={styles2.text}>
                加入尊榮會員，每天可獲得2張揪團9折優惠券 ( 限當天使用
                )，商城商品全享9折，不定時贈送各種優惠券
              </div>
            </div>
          </div>
          <div>
            <div className={styles2.area3}>
              <div className={styles.title}>儲值紀錄</div>
              <div className={styles.scroll}>
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
                <MemMoneyRecord
                  money={'800'}
                  date={'2023/01/09'}
                  time={'18:30'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
