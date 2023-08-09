import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import MemBar from '@/components/member/mem-bar';
import MemActBooking from '@/components/member/mem-actBooking';
import MemActTakeAway from '@/components/member/mem-actTakeAway';
import MemActMail from '@/components/member/mem-actMail';
import MemAllTitle from '@/components/member/mem-allTitle';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-activity.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MemBtn from '@/components/member/mem-Btn';
import MemNologin from '@/components/member/mem-nologin';
import { useRouter } from 'next/router';

export default function Index() {
  const [list, setList] = useState(<MemActMail />);

  const { auth } = useContext(AuthContext);

  const router = useRouter();

  const changeList = (e) => {
    switch (e.currentTarget.value) {
      case '商城訂單':
        setList(<MemActMail />);
        break;

      case '外帶餐點':
        setList(<MemActTakeAway />);
        break;

      case '餐廳訂位':
        setList(<MemActBooking />);
        break;
    }
  };

  // 判斷式否登入，未登入跳轉回首頁
  useEffect(() => {
    if (!localStorage.getItem('auth')) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, []);

  return !auth.account ? (
    <MemNologin />
  ) : (
    <div className={styles2.body}>
      <div className={styles.container}>
        <MemBar />
        <div className={styles.rightArea}>
          <div className={styles2.actArea}>
            {/* <div className={styles2.animateArea}>
              <div className={styles2.animate}>123</div>
            </div> */}
            <MemAllTitle title={'進行中的活動'} />
            <div className={styles2.area1}>
              <div className={styles2.scrollArea}>
                <MemBtn
                  text={'商城訂單'}
                  onClick={changeList}
                  padding={'20px 10px'}
                />
                <MemBtn
                  text={'外帶餐點'}
                  onClick={changeList}
                  padding={'20px 10px'}
                />
                <MemBtn
                  text={'餐廳訂位'}
                  onClick={changeList}
                  padding={'20px 10px'}
                />
              </div>

              <div>{list}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
