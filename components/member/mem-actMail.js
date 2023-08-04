import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Image from 'next/image';
import { v4 } from 'uuid';
import styles from './mem-actMail.module.css';
import MemMailDetail from './mem-mailDetail';

export default function MemActMail() {
  const { auth } = useContext(AuthContext);
  const [mail, setMail] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/mailRecord', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMail(data);
        });
    }
  }, [auth]);

  const openMail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div>訂單編號</div>
        <div>訂單狀態</div>
        <div>下單時間</div>
        <div>訂單金額</div>
      </div>

      {showDetail && (
        <div className={styles.detailArea}>
          <MemMailDetail openMail={openMail} />
        </div>
      )}
      <div className={styles.area1}>
        <div className={styles.scrollArea}>
          {mail.map((v) => {
            return (
              <button
                key={v4()}
                className={styles.row}
                onClick={() => openMail()}
              >
                <div className={styles.td}>{v.order_id}</div>
                <div className={styles.td}>
                  {v.status ? '待出貨' : '運送中'}
                </div>
                <div className={styles.td}>{v.created_at.substring(0, 10)}</div>
                <div className={styles.td}>{v.total_price}元</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
