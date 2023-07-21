import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import { add } from 'lodash';
import Link from 'next/link';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

export default function AddNewItem() {

  const router = useRouter()

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

  const handleAddItem = (e) => {
    const newAddItem = { ...addItem, [e.target.name]: e.target.value }
    setAddItem(newAddItem)
  }


  const [getImg, setGetImg] = useState(null)
  const fileUrl = 'http://localhost:3003/previewImg'
  const imgLink = 'http://localhost:3003/img/'

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
  console.log(getImg)

  const handlePhoto = () => {
    setAddItem({ ...addItem, photo: getImg })
  }

  // 新增商品的驗證

  useEffect(() => {
    handlePhoto()
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

    if (!addItem.name) {
      newErrors.name = '請填入商品名稱'
      isPass = false
    }

    if (!addItem.description) {
      newErrors.description = '請填入商品敘述'
      isPass = false
    }

    if (!addItem.foodCate) {
      newErrors.foodCate = '請選擇商品分類'
      isPass = false
    }

    if (!addItem.price) {
      newErrors.price = '請填入商品價格'
      isPass = false
    }
    setErrors(newErrors)

    if (isPass) {

      Swal.fire({
        title: '你確定要新增此項商品嗎?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '確定新增',
        denyButtonText: `取消新增`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('新增成功!', '', 'success')
          fetch('http://localhost:3003/res/add-item', {
            method: 'POST',
            body: JSON.stringify(addItem),
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
          <div className="container-sm">100% wide until small breakpoint</div>
          <div className="container-md">100% wide until medium breakpoint</div>
          <div className="container-lg">100% wide until large breakpoint</div>
          <div className="container-xl">100% wide until extra large breakpoint</div>
          <div className="container-xxl">100% wide until extra extra large breakpoint</div>

          <div className="card p-5 rounded-3 border-black border-3" style={{ backgroundColor: '#FFE2E2' }}>
            <div className="card-title d-flex justify-content-center fw-bold fs-5">
              <Btn text="新增商品" />
              <Link href={`/res/item-management`}>
                <Btn text="商品清單" />
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <div className={`${styles.uploadImg}`}>
                  <div className="d-flex align-items-center fw-bold fs-5">

                    <div>
                      <img src={`${imgLink}${getImg}`} style={{ height: '400px', width: '400px', overflow: 'static', border: '10px' }} />
                    </div>

                  </div>
                </div>


                <input type="file" name='preImg' id='preImg' className='mt-3' accept="image/jpeg, image/png" onChange={previewImg}></input>


                <div className='name mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品名稱</div>
                  <input
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品名稱:"
                    name='name'
                    value={addItem.name}
                    onChange={handleAddItem}
                  />
                </div>

                <div className='error fs-5 fw-bold'>{errors.name}</div>

                <div className='name mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品敘述</div>
                  <textarea
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品敘述:"
                    name='description'
                    value={addItem.description}
                    onChange={handleAddItem}
                  />
                </div>
                <div className='error fs-5 fw-bold'>{errors.description}</div>

                <div className='mt-3 mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品分類</div>
                  <select name='foodCate' value={addItem.foodCate} onChange={(e) => {
                    setAddItem({ ...addItem, foodCate: e.target.value })
                  }} >
                    <option value={''}>---請選擇商品分類---</option>
                    {foodCateOptions.map((v, i) => {
                      return <option key={i} value={v}>{v}</option>
                    })}
                  </select>
                </div>

                <div className='error fs-5 fw-bold'>{errors.foodCate}</div>

                <div className='price mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品價格</div>
                  <input
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品價格:"
                    name='price'
                    value={addItem.price}
                    onChange={handleAddItem}
                  />
                </div>
                <div className='error fs-5 fw-bold'>{errors.price}</div>

                <div className='note mx-5 mt-3 d-flex justify-content-start align-items-center'>
                  <div htmlFor="shop_name" className="form-label d-flex justify-content-center fw-bold me-3 py-1 border border-black rounded-3" style={{ width: '150px', backgroundColor: '#FCC8A1' }}>商品備註</div>
                  <textarea
                    type="text"
                    className="form-control border-black"
                    id="name"
                    placeholder="請輸入商品備註:"
                    name='note'
                    value={addItem.note}
                    onChange={handleAddItem}
                  />
                </div>



                <div className="d-flex justify-content-between mt-3">
                  <div>
                    {/* <Btn text="確認送出" /> */}
                    <input className="btn btn-warning me-3 border border-black" type="submit" value="確認新增" />
                  </div>
                  <div>
                    {/* <Btn text="取消填寫" /> */}
                    <input className="btn btn-warning mx-3 border border-black" type="reset" value="取消新增" />
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
