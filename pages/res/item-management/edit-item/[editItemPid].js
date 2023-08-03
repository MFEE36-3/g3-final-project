import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import { add, head, shuffle } from 'lodash';
import Link from 'next/link';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';
import { headers } from 'next/dist/client/components/headers';
import axios from 'axios'

export default function AddNewItem() {

  // 把從後端拿到的資料塞進state
  const [gotData, setGotData] = useState({
    shop_id: 0,
    food_img: "",
    food_title: '',
    food_des: '',
    food_cate: 0,
    food_price: 0,
    food_note: '',
    create_time: '',
    food_id: 0,
  })

  const handleEdit = (e) => {
    if (e && e.target) {
      const newEditItem = { ...gotData, [e.target.name]: e.target.value }
      setGotData(newEditItem)
    }
  }

  const router = useRouter()

  // const getSingleItem = async (food_id) => {
  //   fetch(`http://localhost:3002/res/item-management/editItem/${food_id}`)
  //     .then(r => r.json())
  //     .then(data => {
  //       console.log(data)
  //       setGotData(data.data[0])
  //     })
  // }

  const getSingleItem = async (food_id) => {
    fetch(`http://localhost:3002/res/item-management/editItem/${food_id}`)
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.data) {
          setGotData(data.data[0])
        }
      })
  }

  // console.log(gotData)

  useEffect(() => {
    if (router.query) {
      console.log(router)
      console.log(router.query)
      const editItemPid = router.query.editItemPid;
      console.log(editItemPid)  // 99
      getSingleItem(editItemPid);
    }
  }, [router.query])

  const [foodCate, setFoodCate] = useState('')
  const foodCateOptions = ['前菜', '主菜', '甜點', '飲料']

  const [addItem, setAddItem] = useState({
    shop_id: 1,
    photo: '',
    name: '',
    description: '',
    foodCate: '',
    price: '',
    note: '',
  })

  // const handleAddItem = (e) => {
  //   const newAddItem = { ...addItem, [e.target.name]: e.target.value }
  //   setAddItem(newAddItem)
  // }


  const [getImg, setGetImg] = useState(null)
  const fileUrl = 'http://localhost:3002/res/foodItemPreviewImg'
  const imgLink = 'http://localhost:3002/img/res-img/'

  const previewImg = async (e) => {
    e.preventDefault();
    // const fd = new FormData(e.target); // 直接使用 event.target 作為參數
    const fd = new FormData(); // 建立一個新的 FormData 物件
    fd.append('preImg', e.target.files[0]); // 將選擇的文件加入到 FormData 物件中

    fetch(fileUrl, {
      method: 'POST',
      body: fd,
    }).then((r) => r.json())
      .then((data) => {
        console.log(data);
        setGetImg(data.filename);
      });
  };
  // console.log(getImg)

  // 把新圖片放回狀態
  const newImg = () => {
    setGotData({ ...gotData, food_img: getImg })
  }

  const handlePhoto = () => {
    setAddItem({ ...addItem, photo: getImg })
  }

  // 新增商品的驗證

  useEffect(() => {
    handlePhoto()
    // handleAddItem()
    newImg()
  }, [getImg])

  const originErrors = {
    shop_id: 1,
    photo: 'demo_photo',
    name: '',
    description: '',
    foodCate: '',
    price: '',
    note: '',
  }
  const [errors, setErrors] = useState(originErrors)

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = { ...originErrors }

    let isPass = true

    if (!gotData.food_title) {
      newErrors.name = '請填入商品名稱'
      isPass = false
    }

    if (!gotData.food_des) {
      newErrors.description = '請填入商品敘述'
      isPass = false
    }

    if (!gotData.food_cate) {
      newErrors.foodCate = '請選擇商品分類'
      isPass = false
    }

    if (!gotData.food_price) {
      newErrors.price = '請填入商品價格'
      isPass = false
    }
    setErrors(newErrors)

    if (isPass) {

      Swal.fire({
        title: '你確定要編輯此項商品嗎?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '確定編輯',
        denyButtonText: `取消編輯`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('編輯成功!', '', 'success')
          fetch(`http://localhost:3002/res/${gotData.food_id}`, {
            method: 'PUT',
            body: JSON.stringify(gotData),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(r => r.json())
            .then(data => {
              console.log(data);
            })
          // router.push('/res/add-item-over')
        } else if (result.isDenied) {
          Swal.fire('取消新增', '', 'info')
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
      <div className="container d-flex justify-content-center">
        <div>
          <div className="card p-5 rounded-3 border-black border-3" style={{ backgroundColor: '#FFE2E2' }}>
            <div className="card-title d-flex justify-content-center fw-bold fs-5">
              <Link href={`/res/add-item`}>
                <Btn text="新增商品" />
              </Link>
              <Link href={`/res/item-management`}>
                <Btn text="商品清單" />
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className={`${styles.uploadImg}`}>
                  <div className="d-flex align-items-center fw-bold fs-5">

                    {getImg ? (<div>
                      <img src={`${imgLink}${getImg}`} style={{ height: '400px', width: '400px', overflow: 'static', border: '10px' }} />
                    </div>) : (<div>
                      <img src={`${imgLink}${gotData.food_img}`} style={{ height: '400px', width: '400px', overflow: 'static', border: '10px' }} />
                    </div>)}


                    {/* <div>
                      <img src={`${imgLink}${gotData.food_img}`} style={{ height: '400px', width: '400px', overflow: 'static', border: '10px' }} />
                    </div> */}

                  </div>
                </div>

                <input type="file" name='preImg' id='preImg' className='mt-3' accept="image/jpeg, image/png" onChange={previewImg}></input>

                <div className='name mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" 
                  className="form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品名稱</div>
                  <input
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品名稱:"
                    name='food_title'
                    value={gotData.food_title}
                    onChange={handleEdit}
                  />
                </div>

                <div className='error fs-5 fw-bold'>{errors.name}</div>

                <div className='description mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品敘述</div>
                  <textarea
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品敘述:"
                    name='food_des'
                    value={gotData.food_des}
                    onChange={handleEdit}
                  />
                </div>
                <div className='error fs-5 fw-bold'>{errors.description}</div>

                <div className='mt-3 mx-5 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name"
                    className="form-label d-flex justify-content-center fw-bold me-5 py-1 rounded-3" 
                    style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品分類</div>
                    
                  <select name='foodCate' value={gotData.food_cate} onChange={(e) => {
                    setAddItem({ ...addItem, foodCate: e.target.value })
                  }}
                    className=''
                  // className='form-select col-1'
                  >
                    <option value={''}>---請選擇商品分類---</option>
                    {foodCateOptions.map((v, i) => {
                      return <option key={i} value={v}>{v}</option>
                    })}
                  </select>
                </div>

                <div className='error fs-5 fw-bold'>{errors.foodCate}</div>

                <div className='price mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品價格</div>
                  <input
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品價格:"
                    name='food_price'
                    value={gotData.food_price}
                    onChange={handleEdit}
                  />
                </div>
                <div className='error fs-5 fw-bold'>{errors.price}</div>

                <div className='note mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" 
                  className="form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品備註</div>
                  <textarea
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品備註:"
                    name='food_note'
                    value={gotData.food_note}
                    onChange={handleEdit}
                  />
                </div>



                <div className="d-flex justify-content-between mt-3">
                  <div>
                    {/* <Btn text="確認送出" /> */}
                    <input className="btn btn-primary me-3" type="submit" value="確定編輯" />
                  </div>
                  <div>
                    {/* <Btn text="取消填寫" /> */}
                    <input className="btn btn-danger mx-3 border" type="reset" value="取消編輯" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

