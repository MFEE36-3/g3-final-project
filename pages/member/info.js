import MemrBar from '@/components/common/member/mem-bar';
import MemInfoBtn from '@/components/common/member/mem-infoBtn';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';
import { useState } from 'react';
import MemAllTitle from '@/components/common/member/mem-allTitle';

export default function Info() {
  const infoList = [
    { tag: '會員帳號', content: 'asiagodtone@mgail.com' },
    { tag: '論壇暱稱', content: '亞洲統神', change: '修改' },
    { tag: '帳號密碼', content: '******', change: '修改' },
    { tag: '手機號碼', content: '0911222333', change: '修改' },
    { tag: '錢包餘額', content: 'NT$ 7414 元', change: '儲值' },
    { tag: '會員等級', content: '尊榮會員', change: '升級' },
    { tag: '會員生日', content: '1990 / 10 / 29' },
    { tag: '加入時間', content: '2023 / 06 / 19' },
  ];

  const [memImg, setMemImg] = useState('/member/asiagodtone01.jpg');
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles2.flex}>
            <div style={{ display: 'flex' }}>
              <div className={styles2.img}>
                <Image
                  src={memImg}
                  style={{ objectFit: 'cover' }}
                  width={350}
                  height={350}
                  alt=""
                />
              </div>
              <button className={styles2.btn}>
                <Image
                  src={'/member/camera2.png'}
                  width={60}
                  height={60}
                  alt=""
                />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className={styles2.uploadInput}
                  title=""
                />
              </button>
            </div>
            <div className={styles2.imgbox}>
              <MemAllTitle title={'我的成就'} />
              <div></div>
              <Image
                src={'/member/badge01.svg'}
                style={{ objectFit: 'cover' }}
                className={styles2.box}
                width={60}
                height={60}
                alt=""
              />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <button className={styles2.btn2}>更換</button>
              </div>
            </div>
          </div>
          <div>
            {infoList.map((v) => {
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
