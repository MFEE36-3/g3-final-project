import { useState, useEffect } from 'react';
import BlankLayout from '@/components/layout/blank-layout';
import InputTest from '@/components/common/input-test';
import BtnTest from '@/components/common/btn-test';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './res-resgister-form.module.css';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterForm() {
    const router = useRouter()

    const openDayOptions = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日',]
    const [openDays, setOpenDays] = useState([]);

    const [resCate, setResCate] = useState('')
    const res_cateOptions = ['中式', '西式', '日式', '韓式', '美式', '泰式',]

    const [showImg, setShowImg] = useState('')
    const imgPreview = `http://localhost:3003/img/`
    // previewImg()
    const previewImg = async (e) => {
        e.preventDefault()

        const fd = new FormData(); // 建立一個新的 FormData 物件
        fd.append('preImg', e.target.files[0]); // 將選擇的文件加入到 FormData 物件中

        fetch('http://localhost:3003/previewImg', {
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
        name: '',
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
        latitude:'',
        longitude:'',
    })

    const [testShop, setTestShop] = useState({
        name: '測試用自助餐店',
        phone: '0913654987',
        city: '台北市',
        area: '大同區',
        account: 'testtest@gmail.com',
        password: 'abcabcabc',
        password2: 'abcabcabc',
        owner: '陳小華',
        res_cate: '中式',
        photo: 'testImg.jpg',
        description: '這是一筆測試用資料123123123',
        fulladdress: '',
        fulladdress1: '大同路一段一號',
        open_time: '1:00',
        close_time: '18:00',
        open_days: ['星期二', '星期三', '星期四', '星期五', '星期六',],
        table_number: '10',
    })

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

    const handleFullAddress = () => {
        setShop({ ...shop, fulladdress })
    }

    const handleShowImg = () => {
        setShop({ ...shop, photo: showImg })
    }

    const handleChange = (e) => {
        const newShop = { ...shop, [e.target.name]: e.target.value }
        setShop(newShop)

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

    useEffect(() => {
        if (city === '台北市') {
            setArea(areaOptions[0]);
        } else if (city === '新北市') {
            setArea(areaOptions[1]);
        } else if (city === '基隆市') {
            setArea(areaOptions[2]);
        } else if (city === '') {
            setArea(areaOptions[3])
        }

        handleShowImg()

    }, [city, area, areaOptions, pickArea, shop, switchTable, showImg, openDays, showImg, resCate,]);

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

    // 驗證表單:先建立error清單
    const originErrors = { name: '', phone: '', account: '', password: '', password2: '', owner: '', description: '', avg_consumption: '', fulladdress: '', open_time: '', close_time: '', open_days: '' }
    const [errors, setErrors] = useState(originErrors)
    const handleSubmit = (e) => {
        e.preventDefault()

        const newError = { ...originErrors }

        let isPass = true

        // 開始檢查
        if (!shop.name) {
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
                    Swal.fire('成功送出!', '', '確定')
                    testGoogleAPI()
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
                            router.push('/res/reg-success')
                        })
                } else if (result.isDenied) {
                    Swal.fire('已取消送出!', '', '確定')
                }
            })
        }
    }

    return (
        <>
            <style jsx>
                {`
          .error {
            color: red;
            font-size: 10px;
          }
        `}
            </style>
            <div className="container">RegisterForm-Component</div>
            <div className="container container-sm-fluid">
                <div className='row'>
                    <form className={`${styles.backGroundColor} col-xxl-8 container-fluid col-sm-12 border border-black rounded-4 border-4`}
                    // onSubmit={handleSubmit}
                    >
                        <h1 className="d-flex justify-content-center fw-bold mt-3">商家註冊</h1>
                        <hr />

                        <div className="col-xxl-mx-5">

                            <div className='name mx-5 d-flex justify-content-start align-items-center'>
                                <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>店名:</div>
                                <input
                                    type="text"
                                    className="form-control border-black"
                                    id="shop_name"
                                    placeholder="請輸入店名:"
                                    name='name'
                                    value={shop.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.name}</div>

                            <div className='phone mx-5 d-flex justify-content-start align-items-center mt-3'>

                                <div htmlFor="shop_phone" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>電話:</div>
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

                                <div htmlFor="shop_account" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>帳號:</div>
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

                                <div htmlFor="shop_password" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>密碼:</div>

                                <div class="input-group mb-3 d-flex flex-row mb-3">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control  border-black"
                                        id="shop_password"
                                        placeholder="請輸入密碼，密碼須至少大於六個字:"
                                        name='password'
                                        value={shop.password}
                                        onChange={handleChange}
                                    />
                                    <button type='button' className='btn btn-warning btn-outline-secondary' style={{ fontSize: '12px' }} onClick={toggleShowPassword}>{showPassword ? '隱藏密碼' : '顯示密碼'}</button>
                                </div>

                                {/* <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control  border-black me-3"
                                    id="shop_password"
                                    placeholder="請輸入密碼，密碼須至少大於六個字:"
                                    name='password'
                                    value={shop.password}
                                    onChange={handleChange}
                                />
                                <button type='button' className='btn btn-warning btn-outline-secondary' style={{ fontSize: '12px' }} onClick={toggleShowPassword}>{showPassword ? '隱藏密碼' : '顯示密碼'}</button> */}

                            </div>

                            <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.password}</div>

                            <div className='password2 mx-5 d-flex justify-content-start align-items-center mt-3'>

                                <div htmlFor="shop_password" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>確認密碼:</div>
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

                                <div htmlFor="shop_owner" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>負責人姓名:</div>
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

                                <div htmlFor="shop_owner" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>餐廳敘述:</div>
                                <textarea
                                    className="form-control border-black"
                                    id="description"
                                    placeholder="請簡單介紹您的餐廳!"
                                    name='description'
                                    value={shop.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.description}</div>

                            <div className='avg_consumption mx-5 d-flex justify-content-start align-items-center mt-3'>

                                <div htmlFor="shop_owner" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>平均消費金額:</div>
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

                                <div htmlFor="shop_owner" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>餐廳分類:</div>
                                <select value={resCate} onChange={(e) => {
                                    setResCate(e.target.value)
                                    setShop({ ...shop, res_cate: e.target.value })
                                }}
                                    className='form-select'
                                >
                                    <option value={``}>---請選擇餐廳分類---</option>
                                    {res_cateOptions.map((v, i) => {
                                        return <option key={i} value={v} onChange={handleResCate}>{v}</option>
                                    })}
                                </select>

                            </div>

                            <div className="photo d-flex justify-content-start mt-3 mx-5">
                                <div className="d-flex flex-row align-items-center">
                                    <div htmlFor="res_photo" className="form-label mb-3">


                                    </div>

                                    <div className='d-flex flex-column mb-3'>
                                        {showImg == false ? (<div htmlFor="res_photo" className={`${styles.uploadImg} me-3`}>
                                            商家圖片:
                                        </div>) : (
                                            <div
                                                htmlFor="res_photo"
                                                className={`${styles.uploadImg} me-3`}
                                                name='photo'
                                                onChange={handleChange}>
                                                <img src={`${imgPreview + showImg}`} style={{ height: '300px', width: '300px', overflow: 'static' }} alt="" />
                                            </div>)}
                                        <div className="mt-3">
                                            <input type="file" name='preImg' accept="image/jpeg" onChange={previewImg}></input>


                                        </div>
                                    </div>


                                    {/* https://github.com/mfee-react/example-projects/tree/main/%E5%9C%96%E6%AA%94%E4%B8%8A%E5%82%B3%E8%88%87%E9%A0%90%E8%A6%BD */}

                                </div>
                            </div>

                            <div className='error me-5 pe-5 fs-5 fw-bold d-flex justify-content-center'>{errors.avg_consumption}</div>

                            <div className='address mx-5 fw-bold mt-3'>請輸入完整地址:</div>
                            <div className={`d-flex justify-content-between mt-1 col-xxl-3 col-sm-6 mx-5 ${styles.addressDisplay}`}
                            // style={``}
                            >

                                <select name='city' value={city} onChange={(e) => {
                                    setCity(e.target.value)
                                    setShop({ ...shop, city: e.target.value })
                                }} className='me-1 form-select col-3'>
                                    <option value=''>---請選擇城市---</option>
                                    {cityOptions.map((v, i) => {
                                        return <option key={i} value={v}>{v}</option>
                                    })}
                                </select>
                                <div className={`d-flex align-items-center me-1  
                                    ${styles.hideDash}`}>-</div>
                                <select name='area' value={pickArea} onChange={(e) => {
                                    setPickArea(e.target.value)
                                    setShop({ ...shop, area: e.target.value })
                                }}
                                    className='form-select col-3'
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
                                            value={city + pickArea}
                                            onChange={handleChange}
                                        />
                                        <div className='mx-2'>-</div>
                                        <input
                                            type='text'
                                            className="form-control border-black"
                                            placeholder="請填入完整地址123"
                                            name='fulladdress1'
                                            value={shop.fulladdress1}
                                            onChange={handleChange}
                                            onKeyDown={testGoogleAPI}
                                        />
                                    </div>

                                    <div id="shop" className="form-text">
                                        請填入完整地址
                                    </div>
                                    <button type='button' className='btn btn-primary' onClick={testGoogleAPI}>測試api按鈕</button>
                                </div>
                            </div>

                            <div className='error pe-5 mx-5 fs-5 fw-bold d-flex justify-content-start'>{errors.fulladdress}</div>

                            <div className="open_time d-flex flex-column mb-3 mt-3 mx-5">
                                <div id="open_time" className="form-text fw-bold">
                                    請選擇營業時間
                                </div>
                                <div className={`col-3`}>
                                    <div className={`d-flex flex-row ${styles.openTimes}`}>
                                        <select className="form-select col-3" value={shop.open_time} onChange={(e) => {
                                            setShop({ ...shop, open_time: e.target.value })
                                        }}>

                                            <option selected>開始營業時間</option>
                                            {Array(24).fill(1).map((v, i) => {
                                                return <option key={i} value={`${i}:00`}>{`${i}:00`}</option>
                                            })}

                                        </select>

                                        <div className="mx-3">:</div>

                                        <select className="form-select col-3" value={shop.close_time} onChange={(e) => {
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
                                    <div id="open_time" className="form-text fw-bold">
                                        請選擇營業日期:
                                    </div>

                                    <div className="d-flex justify-content-between mt-2">
                                        {openDayOptions.map((v, i) => {
                                            return <label key={i} className={`me-4 ${styles.openDays}`} >
                                                <input
                                                    className=''
                                                    type='checkbox'
                                                    value={v}
                                                    checked={shop.open_days.includes(v)}
                                                    onChange={handleOpenDays}
                                                />{v}
                                            </label>
                                        })}

                                    </div>

                                </div>
                            </div>

                            <div className="col-5 mx-5">
                                <div className="mt-3 fw-bold">如欲開放訂位功能，請勾選並填寫桌型:</div>

                                <div className={`d-flex flex-row my-3 ${styles.openDays}`}>

                                    <button
                                        type='button'
                                        className='form-label  btn btn-primary rounded-3 px-3 py-2 fw-bold me-5'
                                        // style={{ backgroundColor: '#FCC8A1' }}
                                        onClick={(e) => {
                                            setSwitchTable('normal')
                                            setShop({ ...shop, table_number: '' })
                                        }}
                                    >一般桌型</button>

                                    <button
                                        type='button'
                                        className='form-label  btn btn-primary rounded-3 px-3 py-2 fw-bold ms-1'
                                        // style={{ backgroundColor: '#FCC8A1' }}
                                        onClick={(e) => {
                                            setSwitchTable('advance')
                                            setShop({ ...shop, table_number: '' })
                                        }}
                                    >進階桌型</button>

                                </div>

                                {switchTable == 'normal' ?
                                    <div className='normal'>
                                        <div className='fw-bold'>一般桌型:</div>
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
                                        <div>(這個是進階桌型的部分)</div>
                                        <div className='fw-bold'>進階桌型:</div>

                                        <div className=" d-flex align-items-center justify-content-between">
                                            <select className="form-select me-3">
                                                <option selected>兩人桌</option>
                                                <option value="1">四人桌</option>
                                                <option value="2">六人桌</option>
                                                <option value="3">八人桌</option>
                                            </select>
                                            <input
                                                type="text"
                                                className="form-control border-black"
                                                id="shop_tables"
                                                placeholder="請填入桌數"
                                                name='table_number'
                                                value={shop.table_number}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div>
                                            <button
                                                className='form-label border border-black rounded-3 px-3 py-1 fw-bold ms-1 mt-3'
                                                style={{ backgroundColor: '#FCC8A1' }}
                                                onClick={(e) => {
                                                    // addTable.createElement('<select>')
                                                }}
                                            >+新增桌型</button>
                                        </div>
                                    </div>
                                }

                            </div>

                            <div className="d-flex justify-content-between mt-3 mx-5">
                                <div className="justify-content-between d-flex align-items-center">
                                    <input
                                        type="text"
                                        className="form-control border-black"
                                        id="shop_verify-num"
                                        placeholder="請填入驗證碼" />
                                    <button
                                        type='button'
                                        className='form-label btn btn-primary rounded-3 px-3 py-1 fw-bold ms-1 mt-3'
                                    // style={{ backgroundColor: '#FCC8A1' }}
                                    >
                                        寄送驗證碼</button>
                                </div>
                            </div>

                            <hr />

                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-primary my-3 mx-3" onSubmit={handleSubmit} onClick={handleSubmit}>
                                    確認送出
                                </button>

                                <button type="reset" className="btn btn-danger my-3 mx-3">
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
