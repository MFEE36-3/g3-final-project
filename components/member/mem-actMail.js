import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Image from 'next/image';
import { v4 } from 'uuid';
import styles from './mem-actMail.module.css';
import MemMailDetail from './mem-mailDetail';

export default function MemActMail() {
  const { auth } = useContext(AuthContext);
  const [mail, setMail] = useState([]);
  const [showDetail, setShowDetail] = useState([]);
  const [data, setData] = useState({});
  const [doRerender, setDoRerender] = useState(false);

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
          setMail(
            data.map((i) => {
              i.isClosed = false;
              return i;
            })
          );
        });
    }
  }, [auth]);

  const openMail = (id) => {
    setMail(
      mail.map((i) => {
        if (i.order_id !== id) {
          i.isClosed = false;
        } else {
          i.isClosed = !i.isClosed;
        }
        return i;
      })
    );
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/mailDetail', {
        method: 'GET',
        headers: {
          Authorization,
          id,
        },
      })
        .then((res) => res.json())
        .then((data) => setShowDetail(data));
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.img0}>
          <Image
            src={'http://localhost:3002/img/member/truck.svg'}
            width={35}
            height={35}
            alt=""
          />
        </div>
        <div>訂單編號</div>
        <div>訂單狀態</div>
        <div>下單時間</div>
        <div>訂單金額</div>
      </div>

      {mail[0] ? (
        <div className={styles.area1}>
          <div className={styles.scrollArea}>
            {mail
              .filter((q) => q.status !== 0)
              .map((v) => {
                return v.isClosed ? (
                  <button
                    key={v.order_id}
                    className={styles.row2}
                    onClick={() => openMail(v.order_id)}
                  >
                    {showDetail?.map((s) => {
                      return (
                        <div key={v4()} className={styles.hideArea}>
                          <div className={styles.td3}>品項 : {s.item_name}</div>
                          <div className={styles.td2}>數量 : {s.amount}</div>
                          <div className={styles.td2}>{s.price}元</div>
                        </div>
                      );
                    })}
                  </button>
                ) : (
                  <button
                    key={v.order_id}
                    className={styles.row}
                    onClick={() => {
                      openMail(v.order_id);
                    }}
                  >
                    <div className={styles.td0}>
                      <Image
                        src={'http://localhost:3002/img/member/truck.svg'}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </div>
                    <div className={styles.td}>
                      {v.order_id.substring(0, 7)}
                    </div>
                    <div className={styles.td}>{v.status && '運送中'}</div>
                    <div className={styles.td}>
                      {v.created_at.substring(0, 10)}
                    </div>
                    <div className={styles.td}>{v.total_price}元</div>
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        <div className={styles.default}>您目前沒有任何訂單</div>
      )}
    </div>
  );
}
