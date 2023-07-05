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
import { FaMailBulk, FaPhoneSquareAlt } from 'react-icons/fa';
import bgSushi from '@/public/main_page/bg_sushi.svg';
import candyChief from '@/public/main_page/candy_chief_trun.svg';
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiBowlOfRice } from "react-icons/gi";
import bgBubbleTea from '@/public/main_page/bg_bubble_tea.svg'

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

      <div className={`${styles.togo_and_reservation}`}>
        <div className={styles.runpic_zone}>
          <div className={styles.runpic}>
            <img src='./main_page/runaway/p1.png' alt='p1'></img>
            <img src='./main_page/runaway/p2.png' alt='p2'></img>
            <img src='./main_page/runaway/p3.png' alt='p3'></img>
            <img src='./main_page/runaway/p4.png' alt='p4'></img>
            <img src='./main_page/runaway/p1.png' alt='p1'></img>
            <img src='./main_page/runaway/p2.png' alt='p2'></img>
            <img src='./main_page/runaway/p3.png' alt='p3'></img>
            <img src='./main_page/runaway/p4.png' alt='p4'></img>
            <img src='./main_page/runaway/p1.png' alt='p1'></img>
            <img src='./main_page/runaway/p2.png' alt='p2'></img>
            <img src='./main_page/runaway/p3.png' alt='p3'></img>
            <img src='./main_page/runaway/p4.png' alt='p4'></img>
          </div>
        </div>
        <Image src={bgSushi} className={styles.bg_sushi} alt='bgSushi' />
        <Image src={candyChief} className={styles.candy_chief} alt='candyChief' />
        <div className={styles.goReservationTitle}>
          <p>Order & Enjoy: Gourmet Delights at Your Doorstep.</p>
          <div>
            <div>
              <div className={styles.icon_outer}>
                <GiForkKnifeSpoon className={styles.ForkBowl} />
              </div>
              <p>美食訂位</p>
              <p>輕鬆預約，享受便捷的訂位服務</p>
            </div>
            <div>
              <Btn text='Order Now!' />
            </div>
            <div>
              <div className={styles.icon_outer}>
                <GiBowlOfRice className={styles.ForkBowl} />
              </div>
              <p>外帶取餐</p>
              <p>享受在家或任何地方的美食盛宴</p>
            </div>
          </div>
        </div>

      </div>

      <div className={`${styles.forum}`}>

        <Image src={bgBubbleTea} className={styles.bgBubbleTea} />

        <div className={styles.bgnews}>
          <div className={styles.newsC}></div>

          <p>美食新聞</p>
          <div className={styles.newsBtn}>
            <Btn text='GO! NEWS' />
          </div>

        </div>
        <div className={styles.bgforum}>
          <div className={styles.forumC}></div>

          <p>美食論壇</p>
          <div className={styles.forumBtn}>
            <Btn text='GO! FORUM' />
          </div>
        </div>
      </div>

      <div className={styles.contact}>
        <Image src={sugoeat} alt='sugoeat' style={{ width: '100%', height: 'auto' }}></Image>
        <div>
          <p className={styles.contact_us}>聯絡我們</p>
        </div>
        <div className={styles.information_group}>
          <div className={styles.information_box}>
            <div><FaMailBulk className={styles.icons} /></div>
            <p>MAIL | iservice@ispan.com.tw</p>
          </div>
          <div className={styles.information_box}>
            <div><FaPhoneSquareAlt className={styles.icons} /></div>
            <p>TEL | (02) 6631-6588</p>
          </div>
        </div>
      </div>
    </>
  )
}



Home.getLayout = LayoutMainPage;

export default Home;
