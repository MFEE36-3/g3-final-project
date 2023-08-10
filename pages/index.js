// import LayoutMainPage from "@/components/layout/layout-mainpage";
import React from 'react';
import BlankLayout from '@/components/layout/blank-layout';
import Footer from '@/components/layout/footer-for-mainpage.js';
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
import sausageLeft from '@/public/main_page/half-sausage-left.svg';
import sausageRight from '@/public/main_page/half-sausage-right.svg';
import Input from '@/components/common/input';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import flyHamburger from '@/public/main_page/fly_hamburger.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import scrollIntoView from 'scroll-into-view-if-needed';
import kamaboko from '@/public/main_page/kamaboko.svg';
import shrimp from '@/public/main_page/shrimp.svg';
import chip from '@/public/img_for_icon/chip.svg';
import Head from 'next/head';


const commodity_data = [
  {
    item_name: "100%天然蘋果汁100ml",
    img_url: "https://i1.momoshop.com.tw/1676619225/goodsimg/0010/515/725/10515725_O_m.webp",
    price: 59
  },
  {
    item_name: "100%天然蘋果汁100ml*10入/盒",
    img_url: "https://i3.momoshop.com.tw/1678464800/goodsimg/0010/915/585/10915585_O_m.webp",
    price: 579
  },
  {
    item_name: "100％蘋果汁(天然蘋果汁 非濃縮還原汁 100ml*10包)",
    img_url: "https://i3.momoshop.com.tw/1689147656/goodsimg/0009/932/182/9932182_O_m.webp",
    price: 568
  },
  {
    item_name: "10種米果120g",
    img_url: "https://i3.momoshop.com.tw/1685423444/goodsimg/0007/906/874/7906874_O_m.webp",
    price: 99
  },
  {
    item_name: "12M+ 寶寶蔬果泥（80ml/包）(12M+ 果泥 綜合果汁 膳食纖維 韓國銷售前10)",
    img_url: "https://i2.momoshop.com.tw/1689148901/goodsimg/0011/243/707/11243707_O_m.webp",
    price: 63
  },
  {
    item_name: "14袋綜合豆果子餅乾341g",
    img_url: "https://i3.momoshop.com.tw/1663780246/goodsimg/0010/075/747/10075747_O_m.webp",
    price: 228
  },
  {
    item_name: "14袋綜合豆果子餅乾3包組(341g/包)",
    img_url: "https://i2.momoshop.com.tw/1677784679/goodsimg/0010/107/945/10107945_O_m.webp",
    price: 609
  },
  {
    item_name: "2入組 食品級冰箱專用密封盒保鮮盒 650ml+1000ml(冷藏收納盒 密封保鮮 醃漬盒)",
    img_url: "https://i3.momoshop.com.tw/1689148187/goodsimg/0010/596/716/10596716_O_m.webp",
    price: 351
  },
  {
    item_name: "3L 熟食干貝 250g",
    img_url: "https://i3.momoshop.com.tw/1688363549/goodsimg/0011/084/968/11084968_O_m.webp",
    price: 565
  },
  {
    item_name: "4入冰箱四分格PP收納保鮮盒-S/L(微波/冷藏/冷凍 透明分隔分類 蔥薑蒜肉醬料食物材 方形好堆疊)",
    img_url: "https://i3.momoshop.com.tw/1689146847/goodsimg/0009/814/221/9814221_O_m.webp",
    price: 449
  },
  {
    item_name: "4包共400顆-飽滿元寶手工水餃-高麗菜、韭菜、玉米任選(上班族15分鐘上菜最好的選擇/年菜配菜)",
    img_url: "https://i1.momoshop.com.tw/1688363144/goodsimg/0005/867/386/5867386_O_m.webp",
    price: 887
  },
  {
    item_name: "5香乖乖50g",
    img_url: "https://i1.momoshop.com.tw/1688450543/goodsimg/0008/455/907/8455907_O_m.webp",
    price: 36
  }
]

const Home = () => {

  const router = useRouter();

  const [sausage_open, setSausage_Open] = useState(false);
  const [search, setSearch] = useState('');
  const [commodity, setCommodity] = useState(commodity_data);
  const [randomvalue, setRandomvalue] = useState(0);


  useEffect(() => {
    const node = document.getElementById('buyForMe')
    const main_page_container = document.getElementById('mainpage_container');

    const timer = setTimeout(() => {
      if (main_page_container.scrollTop === 0) {
        scrollIntoView(node, { behavior: 'smooth' })
      }
    }, 1000);

    // fetch(`${process.env.API_SERVER}/ecshop/item`)
    //   .then(r => r.json())
    //   .then(obj => { setCommodity(obj.data) })

    return () => {
      clearTimeout(timer);
    }
  }, []);


  const search_style = {
    '&:hover fieldset': {
      backgroundColor: 'rgba(250,179,179,0.2)',
      borderColor: '#FAB3B3'
    },
    '& .MuiInputLabel-root': {
      lineHeight: '68px', //原 '23px'
      fontSize: 'var(--h4)',
      fontWeight: 600,
    },
    '& .MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px,-24px) scale(0.75)' //原 'translate(14px,-9px) scale(0.75)'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--sub-color)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--sub-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--sub-color)',
      },
      fontSize: 'var(--h4)',
      fontFamily: 'var(--ff1)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--sub-color)'
    },
    '& label.Mui-focused,label': {
      color: 'var(--main-color)',
    },
  }

  return (
    <>
      <Head>
        <title>食GOEAT!</title>
      </Head>
      <div className={styles.container} id='mainpage_container'>
        <div className={styles.first_page} id='firstPage'>
          <div className={styles.blank_area}></div>
          <Image src={slogan} className={styles.slogan} alt='slogan' priority />
          <Image src={chocoCookie} className={styles.chocoCookie} alt='chocoCookie with site name' priority />
        </div>

        <ul className={styles.sidebar}>
          <Image src={flyHamburger} className={styles.flyHamburger} alt='flyHamburger' />
          <Link href='#firstPage' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>首頁</li>
          </Link>
          {/* <Link href='#firstPage' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>關於我們</li>
          </Link> */}
          <Link href='#buyForMe' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>順路買買</li>
          </Link>
          <Link href='#togoReservation' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>訂位/外帶</li>
          </Link>
          <Link href='#shoppingMall' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>美食商城</li>
          </Link>
          <Link href='#forum' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>美食論壇</li>
          </Link>
          <Link href='#contactUs' className={styles.linkOffstyle}>
            <li className={styles.liBtn}>聯絡我們</li>
          </Link>
        </ul>


        <div className={`${styles.buy_for_me}`} id='buyForMe'>
          <div className={`${styles.buyme_left}`}>
            <Image src={walkbag_line} className={`${styles.walkbag_line}`}
              alt='walkbag_line' />
            <Image src={filled_walkbag_middle} className={styles.filled_walkbag_middle} alt='filled_walkbag_middle' />
            <Image src={filled_walkbag_last} className={styles.filled_walkbag_last} alt='filled_walkbag_last' />
            <div className={styles.shadow_container}>
              <Image src={shadow} className={styles.shadow} alt='shadow' />
            </div>
          </div>

          <div className={`${styles.buyme_right}`}>
            <p>想吃什麼，</p>
            <p>讓別人幫你買！</p>
            <div><p>點擊下方香腸輸入關鍵字</p></div>
            <div className={styles.sausage_container}>
              <div style={sausage_open == false ? { opacity: 0, transition: '1s' } : { opacity: 1, transition: '1s' }}>
                <TextField
                  id="outlined-basic"
                  label='搜尋美食'
                  size='medium'
                  variant="outlined"
                  placeholder='請輸入拉麵、咖哩...'
                  value={search}
                  onChange={(e) => {
                    setSearch(prev => e.target.value);
                  }}
                  sx={search_style}
                  inputProps={{
                    style: {
                      height: 68,
                      width: 220,
                    },
                  }}
                />
              </div>
              <Image alt='sausageLeft' src={sausageLeft} className={sausage_open === false ? styles.sausage_left : styles.sausage_left_active} onClick={() => setSausage_Open(true)} />
              <Image alt='sausageRight' src={sausageRight} className={sausage_open === false ? styles.sausage_right : styles.sausage_right_active} onClick={() => setSausage_Open(true)} />
            </div>
            <div className={styles.goBtn}>
              <Link href={search !== '' ? `/buyforme?keyword=${search}` : '/buyforme'}><Btn text='馬上GOGO!' /></Link>
            </div>
          </div>

        </div>



        <div className={`${styles.togo_and_reservation}`} id='togoReservation'>
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
                <Btn text='Order Now!' onClick={() => (router.push('/reservation'))} />
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

        <div className={`${styles.shopmall}`} id='shoppingMall'>

          <Image src={kamaboko} className={styles.kamaboko} alt='kamaboko' />
          <Image src={shrimp} className={styles.shrimp} alt='shrimp' />
          <Image src={chip} className={styles.chip_go} alt='chip' />
          <div className={styles.shopmall_container}>
            <div className={styles.bestseller}>熱銷商品</div>
            <div className={styles.card_box}>
              {commodity.filter((value, index) => randomvalue <= index && index < randomvalue + 5).map((v) => {
                return (
                  <div className={styles.commodity_card_back}>
                    <div className={styles.commodity_card}>
                      <div className={styles.card_img_box} style={{ 'backgroundImage': `url(${v.img_url})` }}></div>
                      <div className={styles.commodity_info}>
                        <div>{v.item_name}</div>
                        <div className={styles.commodity_price}>NT${v.price}</div>
                      </div>
                    </div>
                  </div>)
              })}

            </div>
            <div className={styles.random_btn}>
              <Btn text='隨機商品' onClick={() => { setRandomvalue(Math.round(7 * Math.random())) }} />
            </div>
            <div className={styles.goshopmall_btn}>
              <Btn text='GO SHOPPING' onClick={() => (router.push('/shopmall'))} />
            </div>
          </div>



        </div>

        <div className={`${styles.forum}`} id='forum'>

          <Image src={bgBubbleTea} className={styles.bgBubbleTea} alt='bgBubbleTea' />

          <div className={styles.bgnews}>
            <div className={styles.newsC}></div>

            <p>美食新聞</p>
            <div className={styles.newsBtn}>
              <Btn text='GO! NEWS' onClick={() => (router.push('/news'))} style={{ boxShadow: '0 1px 3px 1px red' }} />
            </div>

          </div>
          <div className={styles.bgforum}>
            <div className={styles.forumC}></div>

            <p>美食論壇</p>
            <div className={styles.forumBtn}>
              <Btn text='GO! FORUM' onClick={() => (router.push('/forum'))} />
            </div>
          </div>
        </div>
        <div id='contactUs'>
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

          <Footer />
        </div>
      </div>
    </>
  )
}



// Home.getLayout = LayoutMainPage;
Home.getLayout = BlankLayout;

export default Home;
