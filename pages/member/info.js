import MemrBar from '@/components/common/member/mem-bar';
import MemInfoBtn from '@/components/common/member/mem-infoBtn';
import styles from '@/styles/member-css/mem-body.module.css';
import styles2 from '@/styles/member-css/mem-info.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { v4 } from 'uuid';

export default function Info() {
  const infoList = [
    { tag: '帳號', content: 'asiagodtone@mgail.com' },
    { tag: '暱稱', content: '亞洲統神', change: '修改' },
    { tag: '密碼', content: '******', change: '修改' },
    { tag: '手機', content: '0911222333', change: '修改' },
    { tag: '錢包', content: 'NT$ 7414 元', change: '儲值' },
    { tag: '等級', content: '尊榮會員', change: '升級' },
    { tag: '生日', content: '1990 / 10 / 29' },
    { tag: '加入時間', content: '2023 / 06 / 19' },
  ];

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <MemrBar />
        <div className={styles2.rightArea}>
          <div className={styles2.flex}>
            <div className={styles2.img}>
              <Image
                src="/member/asiagodtone01.jpg"
                style={{ objectFit: 'cover' }}
                width={350}
                height={350}
                alt=""
              />
            </div>
            <div className={styles2.btn}>
              <Image
                src="/member/camera.png"
                style={{ objectFit: 'cover' }}
                width={70}
                height={70}
                alt=""
              />
            </div>
            <div className={styles2.box}>
              <div className={styles.title}>成就列表</div>
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
