import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Image from 'next/image';
import styles from './mem-actTakeAway.module.css';
import MemOrderDetail from './MemOrderDetail';
import { v4 } from 'uuid';

export default function MemActTakeAway() {
  const { auth, setAuth } = useContext(AuthContext);
  const [order, setOrder] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [data, setData] = useState([]);
  const [detailSid, setDetailSid] = useState('');

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/foodRecord', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
        });
    }
  }, [auth]);

  const openDetail = (id) => {
    setDetailSid(id);
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/foodDetail', {
        method: 'GET',
        headers: {
          Authorization,
          id,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });

      setShowDetail(!showDetail);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.img0}>
          <Image
            src={'http://localhost:3002/img/member/bag.svg'}
            width={35}
            height={35}
            alt=""
          />
        </div>
        <div>接單餐廳</div>
        <div>總金額</div>
        <div className={styles.th2}>取餐時間</div>
        <div>訂單狀態</div>
      </div>

      {showDetail && (
        <div className={styles.detailArea}>
          <MemOrderDetail
            openDetail={openDetail}
            data={data}
            setShowDetail={setShowDetail}
            detailSid={detailSid}
          />
        </div>
      )}

      {order
      ?.filter((z) => z.status === 0).length > 0 ? (
        <div className={showDetail ? styles.area1_active : styles.area1}>
          <div className={styles.scrollArea}>
            {order
              .filter((z) => z.status === 0)
              .map((v) => {
                return (
                  <button
                    key={v4()}
                    className={styles.row}
                    onClick={() => openDetail(v.sid)}
                  >
                    <div className={styles.td0}>
                      <Image
                        src={'http://localhost:3002/img/member/bag.svg'}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </div>
                    <div className={styles.td}>{v.shop}</div>
                    <div className={styles.td}>{v.amount}元</div>
                    <div className={styles.td2}>
                      {v.order_date.substring(0, 10)}{' '}
                      {v.order_time.substring(0, 5)}
                    </div>
                    <div className={styles.td}>{v.status}</div>
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        <div className={styles.default}>您目前沒有任何外帶餐點</div>
      )}
    </div>
  );
}
