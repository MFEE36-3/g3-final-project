import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import styles from '@/components/res/item/add-item.module.css';
import { add } from 'lodash';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import ResAuthContext from '@/context/ResAuthContext';
import { useContext } from 'react';
import Head from 'next/head'
// import Head from 'next/head'

export default function AddNewItem() {
  const router = useRouter();
  const { resAuth, setResAuth, logout } = useContext(ResAuthContext);

  const [foodCate, setFoodCate] = useState('');
  const foodCateOptions = ['開胃菜', '主餐', '甜點', '飲料', '湯品'];

  const [addItem, setAddItem] = useState({
    shop_id: null,
    photo: '',
    name: '',
    description: '',
    foodCate: '',
    price: '',
    note: '',
  });

  const handleAddItem = (e) => {
    const newAddItem = { ...addItem, [e.target.name]: e.target.value };
    setAddItem(newAddItem);
  };

  // 在登入成功後設置 resAuth.id
  useEffect(() => {
    // 假設 resAuth.id 在登入成功後會設置
    console.log(resAuth.id)
    if (resAuth.id) {
      console.log(resAuth.id)
      setAddItem({ ...addItem, shop_id: resAuth.id });
    }

    // setAddItem({ ...addItem, shop_id: resAuth.id });
    // const res_auth = localStorage.getItem('res-auth')
    // const resData = JSON.parse(res_auth)
    // console.log(resData)
    // setAddItem({ ...addItem, shop_id: resData.id });
    // setAddItem({ ...addItem, shop_id: resAuth.id });

  }, [resAuth.id]);

  const [getImg, setGetImg] = useState(null);
  const fileUrl = 'http://localhost:3002/res/foodItemPreviewImg';
  const imgLink = 'http://localhost:3002/img/res-img/';

  // http://localhost:3002/img/img1.jpg

  const previewImg = async (e) => {
    e.preventDefault();
    const fd = new FormData(); // 建立一個新的 FormData 物件
    fd.append('preImg', e.target.files[0]); // 將選擇的文件加入到 FormData 物件中

    fetch(fileUrl, {
      method: 'POST',
      body: fd,
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setGetImg(data.filename);
      });
  };
  console.log(getImg);

  const handlePhoto = () => {
    setAddItem({ ...addItem, photo: getImg });
  };

  // 新增商品的驗證

  useEffect(() => {
    handlePhoto();
  }, [getImg]);

  const originErrors = {
    shop_id: 1,
    photo: 'demo_photo',
    name: '',
    description: '',
    foodCate: '',
    price: '',
    note: '',
  };
  const [errors, setErrors] = useState(originErrors);

  const handleSubmit = (e) => {
    e.preventDefault();

    // setAddItem({ ...addItem, shop_id: resAuth.id });

    const newErrors = { ...originErrors };

    let isPass = true;

    if (!addItem.name) {
      newErrors.name = '請填入商品名稱';
      isPass = false;
    }

    if (!addItem.description) {
      newErrors.description = '請填入商品敘述';
      isPass = false;
    }

    if (!addItem.foodCate) {
      newErrors.foodCate = '請選擇商品分類';
      isPass = false;
    }

    if (!addItem.price) {
      newErrors.price = '請填入商品價格';
      isPass = false;
    }
    setErrors(newErrors);

    if (isPass) {
      Swal.fire({
        title: '你確定要新增此項商品嗎?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: '確定新增',
        denyButtonText: `取消新增`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('新增成功!', '', 'success');
          fetch('http://localhost:3002/res/add-item', {
            method: 'POST',
            body: JSON.stringify({ ...addItem, shop_id: resAuth.id }),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((r) => r.json())
            .then((data) => {
              console.log(data);
            });
          // location.reload()
          router.push('/res/add-item-over');
        } else if (result.isDenied) {
          Swal.fire('取消新增', '', 'info');
        }
      });
    }
  };

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
      <Head>
        <title>食GOEAT! / 商家中心</title>
      </Head>
      <div className="container d-flex justify-content-center mt-3">
        <div>
          <div className={`${styles.border} card p-5 rounded-3 border-3`}>
            <div className="card-title d-flex justify-content-center align-items-center fw-bold fs-5">
              <div className='fs-2 me-5' style={{ color: 'var(--main-color)' }}>新增商品</div>
              <Link href={`/res/item-management`}>
                <button className={`${styles.btnright} ms-5`}>返回商品清單</button>
              </Link>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={'card-body d-flex flex-column justify-content-center align-items-center ' + styles.info_outer}>
                <div className={`${styles.uploadImg}`}>
                  <div className="d-flex align-items-center fw-bold fs-5">
                    <div>
                      {getImg !== null ? <img src={`${imgLink}${getImg}`} className={styles.uploadImg1} /> : ''}
                    </div>
                  </div>
                </div>

                <input
                  type="file"
                  name="preImg"
                  id="preImg"
                  className="mt-3"
                  accept="image/jpeg, image/png"
                  onChange={previewImg}
                ></input>

                <div className="name mx-5 mt-3 d-flex justify-content-start align-items-center">
                  <div
                    htmlFor="shop_name"
                    className={`${styles.box} form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3`}
                  >
                    商品名稱
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`${styles.input} form-control`}
                      id="name"
                      placeholder="請輸入商品名稱:"
                      name="name"
                      value={addItem.name}
                      onChange={handleAddItem}
                    />
                  </div>
                </div>

                <div className="error fs-5 fw-bold">{errors.name}</div>

                <div className="name mx-5 mt-3 d-flex justify-content-start align-items-center">
                  <div
                    htmlFor="shop_name"
                    className={`${styles.box} form-label d-flex justify-content-center fw-bold me-3 py-1 rounded-3`}
                  >
                    商品敘述
                  </div>
                  <div>
                    <textarea
                      type="text"
                      className={`${styles.textareainput} form-control ${styles.des_textarea}`}
                      id="name"
                      placeholder="請輸入商品敘述:"
                      name="description"
                      value={addItem.description}
                      onChange={handleAddItem}
                    />
                  </div>
                </div>
                <div className="error fs-5 fw-bold">{errors.description}</div>

                <div className="mt-3 mx-5 mt-3 d-flex justify-content-start align-items-center">
                  <div
                    htmlFor="shop_name"
                    className={`${styles.box} form-label d-flex justify-content-center fw-bold py-1  rounded-3`}
                  >
                    商品分類
                  </div>
                  <div>
                    <select
                      className={styles.textareainput + ' 1 ' + styles.select_cate}
                      name="foodCate"
                      value={addItem.foodCate}
                      onChange={(e) => {
                        setAddItem({ ...addItem, foodCate: e.target.value });
                      }}
                    >
                      <option value={''}>---請選擇商品分類---</option>
                      {foodCateOptions.map((v, i) => {
                        return (
                          <option key={i} value={v}>
                            {v}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="error fs-5 fw-bold">{errors.foodCate}</div>

                <div className="price mx-5 mt-3 d-flex justify-content-start align-items-center">
                  <div
                    htmlFor="shop_name"
                    className={`${styles.box} form-label d-flex justify-content-center fw-bold me-3 py-1  rounded-3`}
                  >
                    商品價格
                  </div>
                  <div>
                    <input
                      type="text"
                      className={`${styles.input} form-control`}
                      id="name"
                      placeholder="請輸入商品價格:"
                      name="price"
                      value={addItem.price}
                      onChange={handleAddItem}
                    />
                  </div>
                </div>
                <div className="error fs-5 fw-bold">{errors.price}</div>

                <div className="note mx-5 mt-3 d-flex justify-content-start align-items-center">
                  <div
                    htmlFor="shop_name"
                    className={`${styles.box} form-label d-flex justify-content-center fw-bold me-3 py-1  rounded-3`}
                  >
                    商品備註
                  </div>
                  <div>
                    <textarea
                      type="text"
                      className={`${styles.textareainput} form-control ${styles.des_textarea}`}
                      id="name"
                      placeholder="請輸入商品備註:"
                      name="note"
                      value={addItem.note}
                      onChange={handleAddItem}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <div>
                    {/* <Btn text="確認送出" /> */}
                    <input
                      className={styles.add}
                      type="submit"
                      value="確認新增"
                    />
                  </div>
                  {/* <div>
                    <input
                      className={styles.cancel}
                      type="reset"
                      value="取消新增"
                      onClick={() => {
                        router.push('/res/item-management')
                      }}
                    />
                  </div> */}
                  <div>
                    <button
                      type="button"
                      className={`btn text-light ${styles.add}`}
                      onClick={(e) => {
                        setAddItem({
                          ...addItem, shop_id: null,
                          photo: '',
                          name: '巧克力蛋糕',
                          description: '美味的巧克力蛋糕',
                          foodCate: '甜點',
                          price: '100',
                          note: '',
                        })

                      }}
                    >填寫資料</button>
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
