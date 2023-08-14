import { useState, useEffect, useContext, useRef } from 'react';
import BlankLayout from '@/components/layout/blank-layout';
// import InputTest from '@/components/common/input-test';
// import BtnTest from '@/components/common/btn-test';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './res-setting.module.css';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link';
import ResAuthContext from '@/context/ResAuthContext';
import { check } from 'prettier';
import muistyles from '@/components/res/item/add-item.module.css';
import Head from 'next/head'
import { FaPhotoVideo } from 'react-icons/fa';

export default function resSetting() {
  const router = useRouter()
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext)

  const openDayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',]
  const [openDays, setOpenDays] = useState([]);

  const [resCate, setResCate] = useState('')
  const res_cateOptions = ['中式', '西式', '日式', '韓式', '美式', '泰式',]

  // 看有沒有從後端拿到商家資料
  const [isShopDataFetched, setIsShopDataFetched] = useState(false);

  // 從後端拿商家資料
  const [getShopInfo, setGetShopInfo] = useState({})
  const getShopData = async () => {
    setIsShopDataFetched(true);
    fetch('http://localhost:3002/res/getShopData', {
      method: 'POST',
      body: JSON.stringify(resAuth),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        setShop({
          ...shop,
          shopId: resAuth.id,
          shopname: data.shop,
          phone: data.phone,
          city: data.city,
          area: data.area,
          account: data.account,
          password: data.password,
          password2: '',
          owner: data.owner,
          res_cate: data.category,
          photo: data.photo,
          description: data.res_desc,
          avg_consumption: data.avg_consumption,
          fulladdress: '',
          fulladdress1: data.location,
          open_time: data.open_time,
          close_time: data.close_time,
          open_days: [
            data.Monday == 1 ? '星期一' : '',
            data.Tuesday == 1 ? '星期二' : '',
            data.Wednesday == 1 ? '星期三' : '',
            data.Thursday == 1 ? '星期四' : '',
            data.Friday == 1 ? '星期五' : '',
            data.Saturday == 1 ? '星期六' : '',
            data.Sunday == 1 ? '星期日' : '',
          ],
          table_number: data.seats,
          latitude: data.latitude,
          longitude: data.longitude,
        })
        console.log('----------')
      })
  }

  const [showImg, setShowImg] = useState('')
  const oldImg = `http://localhost:3002/img/shops/`
  const imgPreview = `http://localhost:3002/img/shops/`
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
    shopId: '',
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
  })

  useEffect(() => {
    if (resAuth.account && !isShopDataFetched) {
      getShopData()
      console.log(shop)
      setSendPassword({ ...sendPassword, resId: resAuth.id })
    }
  }, [resAuth]);

  useEffect(() => {

    console.log(shop)

  }, [shop]);

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

  useEffect(() => {
    handleShowImg()
  }, [showImg])

  const handleChange = (e) => {
    const newShop = { ...shop, [e.target.name]: e.target.value };
    setShop(newShop);
  }

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

  const areas = (e) => {
    if (e.target.value == "台北市") {
      setArea(areaOptions[0])
    } else if (e.target.value == "新北市") {
      setArea(areaOptions[1])
    } else if (e.target.value == "基隆市") {
      setArea(areaOptions[2])
    } else if (city === '') {
      setArea(areaOptions[3])
    }
    setCity(e.target.value)
    setShop({ ...shop, city: e.target.value })
  }

  const testGoogleAPI = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=台灣${shop.city}${shop.area}${shop.fulladdress1}&key=AIzaSyBcRKBsOJ9t8gpHAfAC_ZbY4eNTyDlBlMQ`)
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
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

  // 修改密碼的區域
  const [sendPassword, setSendPassword] = useState({
    resId: resAuth.id,
    oldPassword: '',
    newPassword: '',
    newPassword2: ''
  })

  // 密碼錯誤訊息
  const originPasswordError = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
  }
  const [passwordErrors, setPasswordErrors] = useState(originPasswordError)
  // 密碼修改成功訊息
  const [changePwdSuccess, setChangePwdSuccess] = useState('')
  // 傳到後端
  const changePassword = (e) => {
    e.preventDefault()
    setPasswordErrors(originPasswordError)

    const newError = { ...originPasswordError }

    let isPass = true
    if (sendPassword.newPassword !== sendPassword.newPassword2) {
      newError.newPassword = '新密碼與驗證新密碼不相同!'
      isPass = false
    }

    if (isPass) {
      fetch('http://localhost:3002/res/res-setting-password', {
        method: 'POST',
        body: JSON.stringify(sendPassword),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(r => r.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            setChangePwdSuccess('修改密碼成功!')
          } else {
            console.log(data)
            newError.oldPassword = '輸入密碼與舊密碼不相符!'
            setPasswordErrors(newError)
          }
        })
    } else {
      setPasswordErrors(newError)
    }

  }

  const handleChangePassword = async (e) => {
    setSendPassword({ ...sendPassword, [e.target.name]: e.target.value })
  }

  // 驗證表單:先建立error清單
  const originErrors = { name: '', phone: '', account: '', password: '', password2: '', owner: '', description: '', avg_consumption: '', fulladdress: '', open_time: '', close_time: '', open_days: '' }
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

    const email_reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (email_reg.test(shop.account) == false) {
      newError.account = '信箱不符合格式!'
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

    setErrors(newError)

    if (isPass) {

      Swal.fire({
        title: '您確定要編輯資料嗎?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '確定送出',
        denyButtonText: `等等再送`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('成功編輯!', '', '確定')
          testGoogleAPI()
          fetch('http://localhost:3002/res/res-setting', {
            method: 'PUT',
            body: JSON.stringify(shop),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(r => r.json())
            .then(data => {
              console.log(data)
              // router.push('/res/reg-success')
            })
        } else if (result.isDenied) {
          Swal.fire('已取消編輯!', '', '確定')
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
      <div className="container container-sm-fluid mt-4">
        <div className='row'>
          <form className={`${styles.backGroundColor} col-xxl-8 container-fluid col-sm-12 border border-black rounded-4 border-3 px-4`}
          >
            <div className={`d-flex justify-content-center mt-2 ` + styles.res_title} >商家設定</div>

            <div className="col-xxl-mx-5">

              <div className={styles.info_outer}>
                <div className={styles.titleWord}>修改密碼</div>

                <div className='password d-flex justify-content-start align-items-center my-2 mx-5'>

                  <div htmlFor="shop_password" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>輸入舊密碼</div>

                  <div className="input-group d-flex flex-row">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control  border-black"
                      id="shop_password"
                      placeholder="請輸入密碼，密碼須至少大於六個字"
                      name='oldPassword'
                      value={sendPassword.oldPassword}
                      onChange={handleChangePassword}
                    />
                    <button type='button' className={`btn btn-outline-secondary ${styles.labels} ${styles.hide_pass}`} style={{ fontSize: '12px' }} onClick={toggleShowPassword}>{showPassword ? '隱藏密碼' : '顯示密碼'}</button>
                  </div>

                </div>

                <div className='d-flex justify-content-center align-items-center mt-1 mb-1 fw-bold fs-5' style={{ color: 'red' }}>{passwordErrors.oldPassword}</div>

                <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.password}</div>

                <div className='password2 d-flex justify-content-start align-items-center mt-1 mx-5'>

                  <div htmlFor="shop_password" className={`form-label d-flex justify-content-center align-items-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>輸入新密碼</div>
                  <input
                    type="password"
                    className="form-control border-black"
                    id="shop_password2"
                    placeholder="請輸入新密碼:"
                    name='newPassword'
                    value={sendPassword.newPassword}
                    onChange={handleChangePassword}
                  />

                </div>

                <div className='password2 d-flex justify-content-start align-items-center mt-3 mb-3 mx-5'>

                  <div htmlFor="shop_password" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px', }}>驗證新密碼</div>

                  <input
                    type="password"
                    className="form-control border-black"
                    id="shop_password2"
                    placeholder="請再次輸入新密碼:"
                    name='newPassword2'
                    value={sendPassword.newPassword2}
                    onChange={handleChangePassword}
                  />

                </div>
                <div className='d-flex justify-content-center align-items-center mt-1 mb-1 fw-bold fs-5' style={{ color: 'red' }}>{passwordErrors.newPassword}</div>

                <div className='d-flex justify-content-start align-items-center mb-3 mx-5'>
                  {/* <button type='button' className={`btn btn-primary ms-3 ${styles.labels}`} onClick={changePassword}>確定修改
                  </button> */}
                  <div className='d-flex align-items-center justify-content-center ms-2'>
                    <Btn text="確定修改" padding='10px 20px' fs='var(--h7)' onClick={changePassword}/>
                  </div>
                  <div className='ms-4 fw-bold' style={{ color: 'green', paddingLeft: '10px' }}>{changePwdSuccess}</div>
                </div>


                <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.password2}</div>
              </div>

              <div className={styles.info_outer}>
                <h3 className={`mb-2 ps-3 fw-bold ${styles.titleWord}`}>聯絡資訊</h3>



                <div className='phone mx-5 d-flex justify-content-start align-items-center mt-3'>

                  <div htmlFor="shop_phone" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>電話</div>
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

                  <div htmlFor="shop_account" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>帳號</div>
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

              </div>


              <div className={styles.info_outer}>
                <h3 className={`mb-2 ps-3 fw-bold ${styles.titleWord}`}>餐廳基本資料</h3>

                <div className='name mt-3 mx-5 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>店名</div>
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

                <div className='owner mx-5 d-flex justify-content-start align-items-center mt-3'>

                  <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>負責人姓名</div>
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

                  <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px' }}>餐廳敘述</div>
                  <textarea
                    className={`form-control ` + styles.des_textarea}
                    id="description"
                    placeholder="請簡單介紹您的餐廳!"
                    name='description'
                    value={shop.description}
                    onChange={handleChange}
                  />

                </div>

                <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.description}</div>

                <div className='avg_consumption mx-5 d-flex justify-content-start align-items-center mt-3'>

                  <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '150px', }}>平均消費額</div>
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

                <div className='res_cate mx-5 d-flex justify-content-start align-items-center mt-3'>

                  <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold py-1 rounded-3 ${styles.labels}`} style={{ width: '120px' }}>餐廳分類</div>

                  <select
                    value={shop.res_cate}
                    className={styles.select_cate}
                    onChange={(e) => {
                      setResCate(e.target.value);
                      setShop({ ...shop, res_cate: e.target.value });
                    }}
                  // defaultValue={shop.res_cate}
                  >
                    <option value={``}>---請選擇餐廳分類---</option>
                    {res_cateOptions.map((v, i) => {
                      return <option key={i} value={v}>{v}</option>;
                    })}
                  </select>

                </div>

                <div className='description mx-5 d-flex flex-column mb-1 mt-3'>

                  <div htmlFor="shop_owner" className={`form-label d-flex justify-content-center fw-bold me-3 mb-3 py-1 rounded-3 ${styles.labels}`} style={{ width: '120px' }}>餐廳圖片</div>
                  <div className='d-flex flex-column mb-3 '>
                    {showImg == false ? (
                      <img
                        src={`${oldImg + shop.photo}`}
                        style={{ height: '400px', width: '100%', objectFit: 'cover', borderRadius: 5 }}
                        alt="" />
                    ) : (
                      <div
                        htmlFor="res_photo"
                        className={`${styles.uploadImg} me-3`}
                        name='photo'
                        onChange={handleChange}>

                        <img src={`${imgPreview + showImg}`} style={{ height: '300px', width: '300px', overflow: 'static' }} alt="" />
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

                </div>

                <div className='description mx-5 d-flex justify-content-start align-items-center mt-3'></div>
                {/* <div className="photo d-flex justify-content-start mt-3 mx-5">
                  <div className="d-flex flex-row align-items-center">
                    <div htmlFor="res_photo" className="form-label mb-3"></div>

                  </div>
                </div> */}

                <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.avg_consumption}</div>

                <div className={'address mx-5 fw-bold mb-2 ' + styles.labels}>完整地址</div>
                <div className={`d-flex justify-content-start mt-1 col-sm-3 mx-5 ${styles.addressDisplay}`}
                >
                  <select name='city' value={shop.city} onChange={areas}
                    className={'me-1 ' + styles.select_city}>
                    <option value=''>---請選擇城市---</option>
                    {cityOptions.map((v, i) => {
                      return <option key={i} value={v}>{v}</option>
                    })}
                  </select>
                  <div className={`d-flex align-items-center me-1 justify-content-center`}>-</div>

                  <select
                    name='area'
                    value={shop.area}
                    onChange={(e) => {
                      setPickArea(e.target.value);
                      setShop({ ...shop, area: e.target.value });
                    }}
                    className={'me-1 ' + styles.select_city}
                  >
                    <option value=''>---請選擇鄉鎮---</option>
                    {area.map((v, i) => {
                      return <option key={i} value={v}>{v}</option>;
                    })}
                  </select>

                </div>

                <div className="d-flex justify-content-between mt-3 mx-5">
                  <div className="">

                    <div className={`d-flex justify-content-start align-items-center ${styles.addressDisplay}`}>
                      <input
                        type="text"
                        className="form-control"
                        style={{ width: '156px' }}
                        id="fulladdress"
                        placeholder="請填入完整地址"
                        name='fulladdress'
                        value={shop.city + shop.area}
                        onChange={handleChange}
                      />
                      <div className='mx-1'>-</div>
                      <input
                        type='text'
                        className="form-control"
                        placeholder="請填入完整地址"
                        style={{ width: '200px' }}
                        name='fulladdress1'
                        value={shop.fulladdress1}
                        onChange={handleChange}
                        onBlur={testGoogleAPI}
                      />
                    </div>

                  </div>
                </div>

                <div className='error pe-5 mx-5 fs-5 fw-bold d-flex justify-content-start'>{errors.fulladdress}</div>

                <div className="open_time d-flex flex-column mb-3 mt-3 mx-5">
                  <div id="open_time" className={'mb-2 ' + styles.labels}>
                    請選擇營業時間
                  </div>
                  <div>
                    <div className={`${styles.openTimes}`}>
                      <select className={' ' + styles.select_city} style={{ width: 156 }} value={shop.open_time} onChange={(e) => {
                        setShop({ ...shop, open_time: e.target.value })
                      }}>
                        <option selected>開始營業時間</option>
                        {Array(24).fill(1).map((v, i) => {
                          return <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                        })}
                      </select>
                      <div className="ms-1">~</div>
                      <select className={' ' + styles.select_city} style={{ width: 156 }} value={shop.close_time} onChange={(e) => {
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

                <div className="mx-5">
                  <div className={`d-flex flex-row my-3 ${styles.openDays}`}>
                  </div>

                  <div className={'mb-2 ' + styles.labels}>您的餐廳有 <span style={{ color: 'var(--main-color)' }}>{shop.table_number}</span> 個位子</div>

                </div>

              </div>

              <div className='d-flex justify-content-center mt-2'>
                <button type="submit" className={`btn btn-danger my-3 mx-3 ${styles.btn_right}`} onSubmit={handleSubmit} onClick={handleSubmit}>
                  確認編輯
                </button>

                <button type="reset" className={`btn btn-danger my-3 mx-3 ` + styles.btn_cancel} onClick={() => {
                  router.push('/res/res-order-management')
                }}>
                  取消編輯
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
