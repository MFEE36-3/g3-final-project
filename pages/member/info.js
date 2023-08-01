import MemrBar from '@/components/member/mem-bar';
import MemInfoInput from '@/components/member/mem-infoInput';
import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import MemAllTitle from '@/components/member/mem-allTitle';
import Btn from '@/components/common/btn';
import MemNologin from '@/components/member/mem-nologin';

export default function Info() {
  const router = useRouter();
  // 從useContext裡解構出驗證資料的auth及包含會員資料的memberData
  const { auth, setAuth } = useContext(AuthContext);

  const {
    account,
    achieve_name,
    birthday,
    creat_at,
    level,
    mobile,
    name,
    nickname,
    photo,
    sid,
    wallet,
  } = auth;

  const [getImg, setGetImg] = useState('');

  useEffect(() => {
    if (photo) {
      setGetImg(photo);
    }
  }, [auth]);

  const local = process.browser
    ? JSON.parse(localStorage.getItem('auth'))
    : null;
  const password = local ? '*'.repeat(local.length) : '';

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

  const changeImg = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('preImg', e.target.files[0]);

    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/changeImg', {
        method: 'POST',
        body: fd,
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGetImg(data.filename);
        });
    }
  };

  // if (!auth.account) {
  //   setTimeout(() => {
  //     router.push('/');
  //   }, 500);
  //   return <MemNologin />;
  // }

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles2.flex}>
            <div className={styles2.imgflex}>
              <div className={styles2.img}>
                <Image
                  src={'http://localhost:3002/img/' + getImg}
                  className={styles2.imgbig}
                  width={300}
                  height={300}
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
                  onChange={changeImg}
                  name="preImg"
                />
              </div>
            </div>
            <div className={styles2.achieveBox}>
              <MemAllTitle title={achieve_name} />
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
                  setAuth={setAuth}
                  auth={auth}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
