import { useState, useEffect } from 'react';
import BlankLayout from '@/components/layout/blank-layout';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './res-resgister-form.module.css';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link';
import muistyles from '@/components/res/item/add-item.module.css';
import Head from 'next/head'
import { FaPhotoVideo } from 'react-icons/fa';


export default function RegisterForm() {
  const router = useRouter()

  const openDayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',]
  const [openDays, setOpenDays] = useState([]);

  const [resCate, setResCate] = useState('')
  const res_cateOptions = ['中式', '西式', '日式', '韓式', '美式', '泰式',]

  const [showImg, setShowImg] = useState('')
  const imgPreview = `http://localhost:3002/img/shops/`
  // previewImg()
  const previewImg = async (e) => {
    e.preventDefault()

    const fd = new FormData(); // 建立一個新的 FormData 物件
    fd.append('preImg', e.target.files[0]); // 將選擇的文件加入到 FormData 物件中

    fetch('http://localhost:3002/res/shopPreviewImg', {
      method: 'POST',
      body: fd
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.filename) {
          setShowImg(data.filename)
        }
      })
  }

  const [shop, setShop] = useState({
    shopname: '',
    phone: '',
    city: '',
    area: '',
    account: '',
    password: '',
    password2: '',
    owner: '',
    res_cate: '',
    photo: showImg,
    description: '',
    avg_consumption: '',
    fulladdress: '',
    fulladdress1: '',
    open_time: '',
    close_time: '',
    open_days: [],
    table_number: '',
    latitude: '',
    longitude: '',
    verifyEmail: false
  })

  const demo_info = {
    shopname: '志明牛肉麵',
    phone: '0915165498',
    city: '台北市',
    area: '中山區',
    account: 'chou.no98@gmail.com',
    password: 'qwerty',
    password2: 'qwerty',
    owner: '陳小華',
    res_cate: '中式',
    photo: showImg,
    description: '超過二十年的好味道，芳香甘醇的志明牛肉麵，靜候您的光臨',
    avg_consumption: '200',
    fulladdress: '錦州街413號',
    fulladdress1: '錦州街413號',
    open_time: '11:00',
    close_time: '21:00',
    open_days: ["星期二", "星期四", "星期五", "星期六", "星期三", "星期日"],
    table_number: '48',
    latitude: '25.0603595',
    longitude: '121.5416455',
    verifyEmail: false
  }

  // 一鍵輸入假資料
  const ketInFakeData = () => {
    setShop(demo_info)
  }

  // 設計進階桌型的人數總數
  const originalSeats = {
    seat2: 0,
    seat4: 0,
    seat6: 0,
    seat8: 0,
  }
  const [totalSeatNumber, setTotalSeatNumber] = useState({
    seat2: 0,
    seat4: 0,
    seat6: 0,
    seat8: 0,
  })
  const handleTotalSeats = (e) => {
    setTotalSeatNumber({ ...totalSeatNumber, [e.target.name]: e.target.value })
  }
  // 計算進階桌型的總人數
  const calculatTotalSeats = (e) => {
    const totalSeats = parseInt(totalSeatNumber.seat2) * 2 + parseInt(totalSeatNumber.seat4) * 4 + parseInt(totalSeatNumber.seat6) * 6 + parseInt(totalSeatNumber.seat8) * 8
    console.log(String(totalSeats))
    setShop({ ...shop, table_number: String(totalSeats) })
  }

  const handleOpenDays = (e) => {
    const targetValue = e.target.value;
    let newOpenDays;

    if (shop.open_days.includes(targetValue)) {
      newOpenDays = shop.open_days.filter((v2) => v2 !== targetValue)
      setOpenDays(newOpenDays)
    } else {
      newOpenDays = [...shop.open_days, targetValue]
    }
    setShop({ ...shop, open_days: newOpenDays });
  };

  const handleResCate = (e) => {
    setShop({ ...shop, res_cate: e.target.value })
  }

  const handleShowImg = () => {
    setShop({ ...shop, photo: showImg })
  }

  // const handleChange = (e) => {
  //     const newShop = { ...shop, [e.target.name]: e.target.value }
  //     setShop(newShop)
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prevShop) => ({
      ...prevShop,
      [name]: value,
    }));
  };

  const [city, setCity] = useState('')
  const cityOptions = ['台北市', '新北市', '基隆市']

  const [area, setArea] = useState([])
  const [pickArea, setPickArea] = useState('')
  const areaOptions = [["中正區",
    "大同區",
    "中山區",
    "松山區",
    "大安區",
    "萬華區",
    "信義區",
    "士林區",
    "北投區",
    "內湖區",
    "南港區",
    "文山區",], [
    "萬里區",
    "金山區",
    "板橋區",
    "汐止區",
    "深坑區",
    "石碇區",
    "瑞芳區",
    "平溪區",
    "雙溪區",
    "貢寮區",
    "新店區",
    "坪林區",
    "烏來區",
    "永和區",
    "中和區",
    "土城區",
    "三峽區",
    "樹林區",
    "鶯歌區",
    "三重區",
    "新莊區",
    "泰山區",
    "林口區",
    "蘆洲區",
    "五股區",
    "八里區",
    "淡水區",
    "三芝區",
    "石門區",
  ], [
    "仁愛區",
    "信義區",
    "中正區",
    "中山區",
    "安樂區",
    "暖暖區",
    "七堵區",
  ], ['---請選擇鄉鎮---']];

  const [switchTable, setSwitchTable] = useState('advance')

  // 顯示密碼
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const testGoogleAPI = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=台灣${shop.city}${shop.area}${shop.fulladdress1}&key=AIzaSyBcRKBsOJ9t8gpHAfAC_ZbY4eNTyDlBlMQ`)
      .then((r) => r.json())
      .then((obj) => {
        if (obj.results.length > 0) {
          const newShop = {
            ...shop,
            latitude: obj.results[0].geometry.location.lat,
            longitude: obj.results[0].geometry.location.lng
          };
          setShop(newShop);
        } else {
          // 處理 API 無結果的錯誤
          console.error('錯誤：找不到結果。');
        }
      })
      .catch((error) => {
        // 處理 fetch 錯誤
        console.error('獲取數據時出錯：', error);
      });
  };

  useEffect(() => {
    handleShowImg()
  }, [showImg])

  const areas = (e) => {
    if (e.target.value === "台北市") {
      setArea(areaOptions[0])
    } else if (e.target.value === "新北市") {
      setArea(areaOptions[1])
    } else if (e.target.value === "基隆市") {
      setArea(areaOptions[2])
    } else if (e.target.value === '') {
      setArea(areaOptions[3])
    }
    setCity(e.target.value)
    setPickArea('')
    setShop({ ...shop, city: e.target.value, area: '', }) // 這裡添加 fulladdress1 的設置
  }

  // 寄送驗證信:
  // 1、點擊發送，連結到send的後端api
  // 送出前先用一個state接住等等傳回來的Codes
  const [code, setCodes] = useState({
    sixDigitCode: '',
    matchCode: ''
  })
  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    // 使用正則表達式驗證輸入是否為六位數整數
    const regex = /^\d{0,6}$/;
    if (regex.test(inputValue)) {
      // 符合條件的輸入才更新state
      setCodes({ ...code, [e.target.name]: e.target.value })
    }
  }

  const [sendMailHint, setSendMailHint] = useState('')
  const sendVerifyCodeEmail = async () => {
    setSendMailHint('已送出驗證信件,信件將在60秒後過期!')
    fetch('http://localhost:3002/res/sendVerifyCode', {
      method: 'POST',
      body: JSON.stringify(shop),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setCodes({ ...code, sixDigitCode: '', matchCode: '' })
        const newCodes = { ...code, matchCode: data.matchCode }
        setCodes(newCodes)
        // console.log(code)
      })
  }

  useEffect(() => {
    console.log(code); // {sixDigitCode: '', matchCode: '57048000'}
  }, [code])

  // 拿到驗證碼輸入完blur後要跟資料庫對比
  const [showMessage, setShowMessage] = useState('')
  const checkSixDigitCode = async (e) => {
    if (code.sixDigitCode.length != 0 && code.matchCode) {
      fetch('http://localhost:3002/res/checkVerifyCode', {
        method: 'POST',
        body: JSON.stringify(code),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(r => r.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            setShowMessage('驗證碼正確!')
            setShop({ ...shop, verifyEmail: true })
          } else {
            setShowMessage('驗證碼不正確!')
          }
        })
    } else {
      setShowMessage('尚未寄送驗證信!')
    }
  }

  console.log('-------')
  // 驗證表單:先建立error清單
  const originErrors = { name: '', phone: '', account: '', password: '', password2: '', owner: '', description: '', avg_consumption: '', fulladdress: '', open_time: '', close_time: '', open_days: '', verifyEmail: '' }
  const [errors, setErrors] = useState(originErrors)
  const handleSubmit = (e) => {
    e.preventDefault()

    const newError = { ...originErrors }

    let isPass = true

    // 開始檢查
    if (!shop.shopname) {
      newError.name = '請輸入店名'
      isPass = false
    }

    const phone_reg = /((?=(09))[0-9]{10})$/
    if (phone_reg.test(shop.phone) == false) {
      newError.phone = '請照格式輸入!'
      isPass = false
    }

    const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    // const email_reg = /^[a-zA-Z0-9._%+-]+?\.[a-zA-Z]{2,3}$/
    if (email_reg.test(shop.account) == false) {
      newError.account = '信箱不符合格式!'
      isPass = false
    }

    if (shop.password.length < 6 || shop.password.length > 12) {
      newError.password = '密碼要6~12個字元'
      isPass = false
    }

    if (shop.password2 !== shop.password) {
      newError.password = '密碼與確認密碼不同!'
      newError.password2 = '密碼與確認密碼不同!'
      isPass = false
    }

    if (!shop.owner) {
      newError.owner = '請填寫負責人姓名!'
      isPass = false
    }

    if (!shop.description) {
      newError.description = '請加入商店敘述!'
      isPass = false
    }

    if (!shop.avg_consumption) {
      newError.avg_consumption = '請填入平均消費金額!'
      isPass = false
    }

    if (!shop.fulladdress1) {
      newError.fulladdress = '請填寫地址'
      isPass = false
    }

    if (!shop.open_time || !shop.close_time) {
      newError.open_time = '請填寫營業時間!'
      isPass = false
    }

    if (!shop.verifyEmail) {
      newError.verifyEmail = '請驗證信箱!'
      isPass = false
    }

    setErrors(newError)

    if (isPass) {

      Swal.fire({
        title: '您確定要送出註冊資料嗎?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '確定送出',
        denyButtonText: `等等再送`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('成功註冊!', '', '請重新登入!')
          testGoogleAPI()

          // 註冊成功將商家資料寫進localStorage
          // fetch('http://localhost:3002/res/registerData', {
          //   method: 'POST',
          //   body: JSON.stringify(shop),
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // })
          //   .then(r => r.json())
          //   .then(obj => {
          //     console.log(obj)
          //     localStorage.setItem('res-auth', JSON.stringify({
          //       account: obj[0].account,
          //       sid: obj[0].sid,
          //       photo: obj[0].photo,
          //       shop: obj[0].shop
          //     }))
          //   })

          fetch('http://localhost:3002/res/res-register-form', {
            method: 'POST',
            body: JSON.stringify(shop),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(r => r.json())
            .then(data => {
              console.log(data)
              router.push('/login')
            })

        } else if (result.isDenied) {
          Swal.fire('已取消送出!', '', '確定')
        }
      })
    }
  }

  return (
    <>
      <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
      <style jsx>
        {`
          .error {
            color: red;
            font-size: 10px;
          }
        `}
      </style>
      <div className="container container-sm-fluid mt-3">
        <div className='row'>
          <form className={`${styles.backGroundColor} ${styles.info_outer} col-xxl-8 container-fluid col-sm-12 border border-black rounded-4 border-3`}
          // onSubmit={handleSubmit}
          >
            <h1 className={"d-flex justify-content-center fw-bold mt-3 pb-2 mx-2 " + styles.res_title}>商家註冊</h1>

            <div className="col-xxl-mx-5 mt-4">
              <div className='name mx-5 d-flex justify-content-end align-items-center'><button type='button' className={`form-label btn d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }} onClick={ketInFakeData}>一鍵填寫資料</button></div>

              <div className='name mx-5 d-flex justify-content-start align-items-center'>
                <div htmlFor="shop_name" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>店名</div>
                <input
                  type="text"
                  className="form-control border-black"
                  id="shop_name"
                  placeholder="請輸入店名:"
                  name='shopname'
                  value={shop.shopname}
                  onChange={handleChange}
                />
              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.name}</div>

              <div className='phone mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_phone" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>電話</div>
                <input
                  type="text"
                  className="form-control border-black"
                  id="shop_phone"
                  placeholder="電話格式:0912345678"
                  name='phone'
                  value={shop.phone}
                  onChange={handleChange}
                />

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.phone}</div>

              <div className='account mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_account" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>帳號</div>
                <input
                  type="text"
                  className="form-control border-black"
                  id="shop_account"
                  name='account'
                  value={shop.account}
                  onChange={handleChange}
                  placeholder="請輸入電子信箱:" />

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.account}</div>

              <div className='password mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_password" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px', }}>密碼</div>

                <div className="input-group mb-3 d-flex flex-row mb-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control  border-black"
                    id="shop_password"
                    placeholder="請輸入密碼，密碼須至少大於六個字:"
                    name='password'
                    value={shop.password}
                    onChange={handleChange}
                  />
                  <button type='button' className={`btn  ${muistyles.btnright} ${styles.hide_pass}`} style={{ fontSize: '12px' }} onClick={toggleShowPassword}>{showPassword ? '隱藏密碼' : '顯示密碼'}</button>
                </div>

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.password}</div>

              <div className='password2 mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_password" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px', }}>確認密碼</div>
                <input
                  type="password"
                  className="form-control border-black"
                  id="shop_password2"
                  placeholder="請再次輸入密碼:"
                  name='password2'
                  value={shop.password2}
                  onChange={handleChange}
                />

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.password2}</div>

              <div className='owner mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>負責人姓名</div>
                <input
                  type="text"
                  className="form-control border-black"
                  id="shop_owner"
                  placeholder="請輸入負責人姓名:"
                  name='owner'
                  value={shop.owner}
                  onChange={handleChange}
                />

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.owner}</div>


              <div className='description mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px', }}>餐廳敘述</div>
                <textarea
                  className={"form-control " + styles.des_textarea}
                  id="description"
                  placeholder="請簡單介紹您的餐廳!"
                  name='description'
                  value={shop.description}
                  onChange={handleChange}
                />

              </div>

              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.description}</div>

              <div className='avg_consumption mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>平均消費額</div>
                <input
                  type="text"
                  className="form-control border-black"
                  id="avg_consumption"
                  placeholder="方便消費者認識您的餐廳!:"
                  name='avg_consumption'
                  value={shop.avg_consumption}
                  onChange={handleChange}
                />

              </div>
              <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.avg_consumption}</div>
              <div className='res_cate mx-5 d-flex justify-content-start align-items-center mt-3'>

                <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold py-1 rounded-3 ${muistyles.btnright}`} style={{ width: '150px' }}>餐廳分類</div>
                <select value={resCate} onChange={(e) => {
                  setResCate(e.target.value)
                  setShop({ ...shop, res_cate: e.target.value })
                }}
                  className={'form-select ' + styles.select_cate}
                >
                  <option value={``}>---請選擇餐廳分類---</option>
                  {res_cateOptions.map((v, i) => {
                    return <option key={i} value={v} onChange={handleResCate}>{v}</option>
                  })}
                </select>

              </div>

              <div className=" d-flex justify-content-start mt-3 mx-5 w-100">
                <div className="d-flex flex-row align-items-center w-100">
                  <div htmlFor="res_photo" className="form-label mb-3">

                  </div>

                  <div className='d-flex flex-column ' style={{ width: '90%' }}>
                    {showImg == false ? (<div htmlFor="res_photo" className={`${styles.uploadImg} me-3 `}>
                      商家圖片
                    </div>) : (
                      <div
                        htmlFor="res_photo"
                        className={``}
                        name='photo'
                        onChange={handleChange}>

                        <img src={`${imgPreview + showImg}`} className={styles.uploadImg} alt="" />

                      </div>)}
                    <div className={styles.upload}>
                      <label htmlFor="file-upload" className="custom-file-upload mt-3">
                        <FaPhotoVideo className={styles.icon} /> 請選擇照片
                      </label>
                      <input id="file-upload" type="file" onChange={previewImg} />
                    </div>
                    {/* <div className="mt-3">
                      <input type="file" name='preImg' accept="image/jpeg" onChange={previewImg}></input>

                    </div> */}
                  </div>

                  {/* https://github.com/mfee-react/example-projects/tree/main/%E5%9C%96%E6%AA%94%E4%B8%8A%E5%82%B3%E8%88%87%E9%A0%90%E8%A6%BD */}

                </div>
              </div>
              {/* <div className="mt-3">
                <input type="file" name='preImg' accept="image/jpeg" onChange={previewImg}></input>
              </div> */}
              <div className={'address mx-5 fw-bold mt-4 mb-2 ' + styles.labels}>請輸入完整地址</div>
              <div className={`d-flex justify-content-between mt-1 col-7 col-sm-3 mx-5 ${styles.addressDisplay}`}
              // style={``}
              >

                <select name='city' value={city} onChange={areas} className={'me-1 form-select col-3 ' + styles.select_city}>
                  <option value=''>---請選擇城市---</option>
                  {cityOptions.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                  })}
                </select>
                <div className={`d-flex align-items-center mx-1 me-2 ${styles.hideDash}`}>-</div>

                <select name='area' value={pickArea} onChange={(e) => {
                  setPickArea(e.target.value)
                  setShop({ ...shop, area: e.target.value })
                }}
                  className={'me-1 form-select col-3 ' + styles.select_city}
                >

                  <option value=''>---請選擇鄉鎮---</option>
                  {area.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                  })}
                </select>

              </div>

              <div className="d-flex justify-content-between mt-3 mx-5">
                <div className="">

                  <div className={`d-flex justify-content-start  align-items-center ${styles.addressDisplay}`}>
                    <input
                      type="text"
                      className="form-control border-black"
                      id="fulladdress"
                      placeholder="請填入完整地址"
                      name='fulladdress'
                      value={shop.city + shop.area}
                      onChange={handleChange}
                    />
                    <div className='mx-2'>-</div>
                    <input
                      type='text'
                      className="form-control border-black"
                      placeholder="請填入完整地址"
                      name='fulladdress1'
                      value={shop.fulladdress1}
                      onChange={handleChange}
                      onBlur={testGoogleAPI}
                    // onKeyDown={testGoogleAPI}
                    />
                  </div>

                  {/* <div id="shop" className="form-text">
                    請填入完整地址
                  </div> */}
                </div>
              </div>

              <div className='error pe-5 mx-5 fs-5 fw-bold d-flex justify-content-start'>{errors.fulladdress}</div>

              <div className="open_time d-flex flex-column mb-3 mt-3 mx-5">
                <div id="open_time" className={'mt-3 mb-2 ' + styles.labels}>
                  請選擇營業時間
                </div>
                <div className={`col-3`}>
                  <div className={`d-flex flex-row ${styles.openTimes}`}>
                    <select className={"form-select col-3 " + styles.select_city} value={shop.open_time} onChange={(e) => {
                      setShop({ ...shop, open_time: e.target.value })
                    }}>

                      <option selected>開始營業時間</option>
                      {Array(24).fill(1).map((v, i) => {
                        return <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                      })}

                    </select>

                    <div className="mx-1">~</div>

                    <select className={"form-select col-3 " + styles.select_city} value={shop.close_time} onChange={(e) => {
                      setShop({ ...shop, close_time: e.target.value })
                    }}>

                      <option selected>結束營業時間</option>
                      {Array(24).fill(1).map((v, i) => {
                        return <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                      })}

                    </select>

                  </div>
                </div>
              </div>

              <div className='error mx-5 pe-5 fs-5 fw-bold d-flex justify-content-start'>{errors.open_time}</div>

              <div className="d-flex justify-content-between mt-3 mx-5">
                <div className=''>
                  <div id="open_time" className={'mb-2 ' + styles.labels}>
                    請選擇營業日期
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    {openDayOptions.map((v, i) => {
                      return <label key={i} className={`me-4 ${styles.openDays}`}>
                        <input
                          className={'me-2 ' + styles.custom_checkbox}
                          type='checkbox'
                          value={v}
                          checked={shop.open_days.includes(v)}
                          // checked={shop.open_days[i] == 1 ? true : false}
                          onChange={handleOpenDays}
                        />
                        <span className={styles.geekmark}></span>
                        <span className='fw-bold'>{v}</span>
                      </label>
                    })}

                  </div>

                </div>
              </div>

              <div className="seats col-5 mx-5">
                <div className={"mt-4 " + styles.labels}>如欲開放訂位功能，請勾選並填寫桌型</div>

                <div className={`d-flex flex-row my-3 ${styles.openDays}`}>

                  <button
                    type='button'
                    className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`}
                    // style={{ backgroundColor: '#FCC8A1' }}
                    onClick={(e) => {
                      setSwitchTable('normal')
                      setShop({ ...shop, table_number: '' })
                    }}
                  >一般桌型</button>

                  <button
                    type='button'
                    className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`}
                    // style={{ backgroundColor: '#FCC8A1' }}
                    onClick={(e) => {
                      setSwitchTable('advance')
                      setShop({ ...shop, table_number: '' })
                      setTotalSeatNumber(originalSeats)
                    }}
                  >進階桌型</button>

                </div>

                {switchTable == 'normal' ?
                  <div className='normal'>
                    <div className='fw-bold mb-2'>一般桌型：</div>
                    <input
                      type="text"
                      className="form-control border-black"
                      id="shop_capacity"
                      placeholder="請填入可內用人數"
                      name='table_number'
                      value={shop.table_number}
                      onChange={handleChange}
                    />
                  </div>
                  :
                  <div className="advance mt-3" id='advanceTable'>


                    <div className="d-flex align-items-center ">
                      <div className='fw-bold'>兩人桌：</div>
                      <input
                        type="text"
                        className="ms-3 my-2 p-2 border rounded"
                        id="shop_tables"
                        placeholder="請填入桌數"
                        name='seat2'
                        value={totalSeatNumber.seat2}
                        onChange={handleTotalSeats}
                        onBlur={calculatTotalSeats}
                      />
                    </div>
                    <div className=" d-flex align-items-center">
                      <div className='fw-bold'>四人桌：</div>
                      <input
                        type="text"
                        className="ms-3 my-2 p-2 border rounded"
                        id="shop_tables"
                        placeholder="請填入桌數"
                        name='seat4'
                        value={totalSeatNumber.seat4}
                        onChange={handleTotalSeats}
                        onBlur={calculatTotalSeats}
                      />
                    </div>
                    <div className=" d-flex align-items-center">
                      <div className='fw-bold'>六人桌：</div>
                      <input
                        type="text"
                        className="ms-3 my-2 p-2 border rounded"
                        id="shop_tables"
                        placeholder="請填入桌數"
                        name='seat6'
                        value={totalSeatNumber.seat6}
                        onChange={handleTotalSeats}
                        onBlur={calculatTotalSeats}
                      />
                    </div>
                    <div className=" d-flex align-items-center">
                      <div className='fw-bold'>八人桌：</div>
                      <input
                        type="text"
                        className="ms-3 my-2 p-2 border rounded"
                        id="shop_tables"
                        placeholder="請填入桌數"
                        name='seat8'
                        value={totalSeatNumber.seat8}
                        onChange={handleTotalSeats}
                        onBlur={calculatTotalSeats}
                      />
                    </div>
                  </div>
                }
                <div className={'mt-2 fw-bold ' + styles.labels}>您的餐廳共有：<span className='mx-2' style={{ color: 'var(--main-color)' }}>{shop.table_number}</span>個位子</div>

              </div>

              <div className="verifyMail d-flex justify-content-between mt-3 mx-5">
                <div className="justify-content-between d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control border-black"
                    id="shop_verify-num"
                    name='sixDigitCode'
                    value={code.sixDigitCode}
                    onChange={handleCodeChange}
                    placeholder="請填入六位數驗證碼"
                    onBlur={checkSixDigitCode}
                  />
                  <button
                    type='button'
                    className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${muistyles.btnright}`}
                    onClick={sendVerifyCodeEmail}
                  >
                    寄送驗證碼</button>

                </div>

              </div>
              <div className='mx-5 fw-bold' style={{ color: 'black' }}>{sendMailHint}</div>
              <div
                className={`d-flex justify-content-between mx-5 fw-bold`}
                style={{ color: `${showMessage == '驗證碼正確!' ? 'green' : 'red'}` }}
              >{showMessage}
              </div>
              <div className='error me-5 ms-5 pe-5 fs-5 fw-bold d-flex justify-content-start'>{errors.verifyEmail}</div>

              <div className='d-flex justify-content-center mt-3'>
                <button type="submit" className={`btn text-light my-3 mx-3 ${styles.btn_right}`} onSubmit={handleSubmit} onClick={handleSubmit}>
                  確認送出
                </button>

                <button type="reset" className={`btn text-light my-3 mx-3 ${styles.btn_cancel}`}>
                  取消填寫
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
