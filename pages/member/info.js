import MemrBar from '@/components/common/member/mem-bar';
import MemInfoInput from '@/components/common/member/mem-infoInput';
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
    sid,
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

  //把fetch到的資料放入陣列中，用map方法傳給子元件
  const list = [
    { tag: '帳號', title: 'account', content: account },
    { tag: '暱稱', title: 'nickname', content: nickname, change: '修改' },
    { tag: '本名', title: 'name', content: name, change: '修改' },
    { tag: '密碼', title: 'password', content: password, change: '修改' },
    { tag: '手機', title: 'mobile', content: mobile, change: '修改' },
    { tag: '錢包', title: 'wallet', content: wallet },
    { tag: '會員等級', title: 'level', content: lev },
    { tag: '會員生日', title: 'birthday', content: birth },
    { tag: '加入時間', title: 'creat_at', content: creat },
  ];

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles2.flex}>
            <div className={styles2.imgflex}>
              <div className={styles2.img}>
                <Image
                  src={'http://localhost:3002/img/' + photo}
                  className={styles2.imgbig}
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
                  className={styles2.imgsmall}
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
            <div className={styles2.achieveBox}>
              <MemAllTitle title={achieve} />
              <Image
                src={'/member/badge01.svg'}
                style={{ objectFit: 'cover' }}
                className={styles2.box}
                width={60}
                height={60}
                alt=""
              />
              <div className={styles2.achieveArea}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <div className={styles2.achBtn}>
                    <Btn text="更換" padding={'5px 1px'} fs="var(--h7)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {list.map((v) => {
              return (
                <MemInfoInput
                  tag={v.tag}
                  content={v.content}
                  change={v.change}
                  key={v4()}
                  sid={sid}
                  title={v.title}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
