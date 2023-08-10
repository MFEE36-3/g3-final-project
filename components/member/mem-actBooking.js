import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Image from 'next/image';
import { v4 } from 'uuid';
import styles from './mem-actBooking.module.css';
import MemBookingDetail from './MemBookingDetail';

export default function MemActBooking() {
  const { auth } = useContext(AuthContext);
  const [mail, setMail] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member/bookingRecord', {
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

  const openDetail = (bookingData) => {
    setShowDetail(!showDetail);
    setData(bookingData);
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.img0}>
          <Image
            src={'http://localhost:3002/img/member/restaurant.svg'}
            width={35}
            height={35}
            alt=""
          />
        </div>
        <div>餐廳</div>
        <div>地址</div>
        <div>訂位時間</div>
        <div>人數</div>
      </div>

      {showDetail && (
        <div className={styles.detailArea}>
          <MemBookingDetail
            openDetail={openDetail}
            data={data}
            setShowDetail={setShowDetail}
          />
        </div>
      )}

      {mail[0] ? (
        <div className={styles.area1}>
          <div className={styles.scrollArea}>
            {mail
              ?.filter((a) => a.status === '未完成')
              .map((v) => {
                return (
                  <button
                    key={v4()}
                    className={styles.row}
                    onClick={() => openDetail(v)}
                  >
                    <div className={styles.td0}>
                      <Image
                        src={'http://localhost:3002/img/member/restaurant.svg'}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </div>
                    <div className={styles.td}>{v.shop}</div>
                    <div className={styles.td}>{v.location}</div>
                    <div className={styles.td}>
                      {v.booking_date.substring(0, 10) +
                        '\u00A0\u00A0\u00A0' +
                        v.booking_time.substring(0, 10)}
                    </div>
                    <div className={styles.td2}>{v.booking_number}人</div>
                  </button>
                );
              })}
          </div>
        </div>
      ) : (
        <div className={styles.default}>您目前沒有任何餐廳訂位</div>
      )}
    </div>
  );
}
