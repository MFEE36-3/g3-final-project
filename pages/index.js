import LayoutMainPage from "@/components/layout/layout-mainpage";
import styles from '@/styles/mainpage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from "next/image";
import chocoCookie from '@/public/main_page/chocoCookie.svg';
import slogan from '@/public/main_page/slogan.svg';
import walkbag_line from '@/public/main_page/walkbag_line.svg';
import filled_walkbag_middle from '@/public/main_page/filled_walkbag_middle.svg';
import filled_walkbag_last from '@/public/main_page/filled_walkbag_last.svg';
import shadow from '@/public/main_page/shadow.svg';
import Btn from "@/components/common/btn";
import sugoeat from '@/public/main_page/sugoeat.svg';

const Home = () => {

  return (
    <>
      <div className={styles.first_page}>
        <div className={styles.blank_area}></div>
        <Image src={slogan} className={styles.slogan} alt='slogan' priority />
        <Image src={chocoCookie} className={styles.chocoCookie} alt='chocoCookie with site name' priority />
      </div>

      <div className={`${styles.buy_for_me}`}>
        <div className={`${styles.buyme_left}`}>
          <Image src={walkbag_line} className={`${styles.walkbag_line}`}
            alt='walkbag_line' />
          <Image src={filled_walkbag_middle} className={styles.filled_walkbag_middle} alt='filled_walkbag_middle' />
          <Image src={filled_walkbag_last} className={styles.filled_walkbag_last} alt='filled_walkbag_last' />
          <Image src={shadow} className={styles.shadow} alt='shadow' />
        </div>

        <div className={`${styles.buyme_right}`}>
          <Btn text='馬上GOGO!' />
        </div>

      </div>
      <div className={styles.contact}>
        <Image src={sugoeat} alt='sugoeat' style={{width:'100%', height: 'auto'}}></Image>
        <div>
          <p className={styles.contact_us}>聯絡我們</p>
        </div>
      </div>
    </>
  )
}



Home.getLayout = LayoutMainPage;

export default Home;
