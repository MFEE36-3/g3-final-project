import Image from 'next/image';
import filled_walkbag_middle from '@/public/main_page/filled_walkbag_middle.svg';
import styles from '@/styles/not_found_page.module.css'

export default function Custom404() {
  return (<>
    <div className={styles.outer_box}>
      <Image src={filled_walkbag_middle} className={styles.walk_bag} alt='filled_walkbag_middle' />
      Oops!沒有這個頁面哦！
    </div>
  </>)
}
