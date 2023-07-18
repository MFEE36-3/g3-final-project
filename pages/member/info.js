import MemrBar from '@/components/common/member/mem-bar';
import MemInfoBtn from '@/components/common/member/mem-infoBtn';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemAllTitle from '@/components/common/member/mem-allTitle';
import Btn from '@/components/common/btn';

export default function Info() {
  const router = useRouter();

  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch('http://localhost:3002/member')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const result = data[0];
        setInfo(result);
      });
  }, [router.query]);

  const {
    account,
    nickname,
    name,
    password,
    mobile,
    wallet,
    level,
    birthday,
    photo,
    creat_at,
    achieve,
  } = info;

  //不要顯示等級1or2，改為顯示會員等級名稱
  const lev = level === 1 ? '一般會員' : '尊榮會員';

  //把時間格式"2023-02-25T16:00:00.000Z"擷取出需要的部分
  const birth = birthday?.substring(0, 10);
  const creat = creat_at?.substring(0, 10);
  // console.log(birthday.substring(0, 10));

  //把fetch到的資料放入陣列中，用map方法傳給子元件
  const list = [
    { tag: '帳號', content: account },
    { tag: '暱稱', content: nickname, change: '修改' },
    { tag: '本名', content: name, change: '修改' },
    { tag: '密碼', content: password, change: '修改' },
    { tag: '手機', content: mobile, change: '修改' },
    { tag: '錢包', content: wallet, change: '儲值' },
    { tag: '會員等級', content: lev, change: '升級' },
    { tag: '會員生日', content: birth },
    { tag: '加入時間', content: creat },
  ];

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles2.flex}>
            <div style={{ display: 'flex' }}>
              <div className={styles2.img}>
                <Image
                  src={'http://localhost:3002/img/' + photo}
                  style={{ objectFit: 'cover' }}
                  width={350}
                  height={350}
                  alt=""
                />
              </div>
              <div className={styles2.btn}>
                <Image
                  src={'/member/camera2.png'}
                  width={65}
                  height={65}
                  alt=""
                />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className={styles2.uploadInput}
                  title=""
                />
              </div>
            </div>
            <div>
              <MemAllTitle title={achieve} />
              <Image
                src={'/member/badge01.svg'}
                style={{ objectFit: 'cover' }}
                className={styles2.box}
                width={60}
                height={60}
                alt=""
              />
              <div>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <div
                    styles={{
                      width: '230px',
                      height: '250px',
                      backgroundColor: 'black',
                    }}
                  >
                    <Btn text="更換" padding={'5px 5px'} fs="var(--h7)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {list.map((v) => {
              return (
                <MemInfoBtn
                  tag={v.tag}
                  content={v.content}
                  change={v.change}
                  key={v4()}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
