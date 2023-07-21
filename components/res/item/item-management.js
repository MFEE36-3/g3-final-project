import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import axios from 'axios';
import styles from '@/components/res/item/item-management.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

export default function Management() {
  const router = useRouter()

  // 拿到物件資料
  const [foodItem, setFoodItem] = useState([]);
  const [originalFoodItem, setOriginalFoodItem] = useState([]); // 給filter用的array

  const getFoodItems = async () => {
    const res = await axios.get('http://localhost:3003/res/item-management/');
    // console.log(res)
    // console.log(res.data.foodItems); // targetArray
    setFoodItem(res.data.rows);
    setOriginalFoodItem(res.data.rows)
  };


  useEffect(() => {
    getFoodItems();
  }, []);

  // imgLink
  const imgLink = "http://localhost:3003/img/"

  // 搜尋分類的selectBox
  // 先做把後端資料的foodCate(1、2、3、4)轉換成字串的function(前菜、主菜、甜點、飲料)
  const changeNumToString = () => {
    const newFoodItem = foodItem.map((item) => {
      if (item.food_cate === 1) {
        return { ...item, foodCateToString: '前菜' };
      }
      if (item.food_cate === 2) {
        return { ...item, foodCateToString: '主菜' };
      }
      if (item.food_cate === 3) {
        return { ...item, foodCateToString: '甜點' };
      }
      if (item.food_cate === 4) {
        return { ...item, foodCateToString: '飲料' };
      }
      return item; // 如果沒有符合的條件，直接返回原物件
    });
    setFoodItem(newFoodItem);
  };

  useEffect(() => {
    changeNumToString()
  }, [foodItem])

  // 現在才開始做selectBox
  const [foodCate, setFoodCate] = useState(0)
  const foodCateOptions = ['全部商品', '前菜', '主菜', '甜點', '飲料']

  const matchList = (e) => {
    if (e.target.value == '前菜') {
      setFoodCate(1)
    }
    if (e.target.value == '主菜') {
      setFoodCate(2)
    }
    if (e.target.value == '甜點') {
      setFoodCate(3)
    }
    if (e.target.value == '飲料') {
      setFoodCate(4)
    }
    if (e.target.value == '全部商品') {
      setFoodCate(5)
    }
  }


  const foodCateFilter = () => {
    if (foodCate == 5) {
      setFoodItem(originalFoodItem);
    } else {
      const newArray = originalFoodItem.filter((v) => v.food_cate == foodCate);
      setFoodItem(newArray);
    }
    // setFoodItem(newArray);
  };


  useEffect(() => {
    foodCateFilter()
  }, [foodCate])

  // 商品排序
  // 由新到舊
  const newToOld = async (e) => {
    const res = await axios.get('http://localhost:3003/res/item-management/DESC');
    setFoodItem(res.data.rows);
    setOriginalFoodItem(res.data.rows)
  }
  // 由舊到新
  const OldToNew = async (e) => {
    const res = await axios.get('http://localhost:3003/res/item-management/ASC');
    setFoodItem(res.data.rows);
    setOriginalFoodItem(res.data.rows)
  }

  // 進入商品編輯頁面
  const editItem = () => {
    router.push(`item-management`)
  }

  // 刪除商品
  const confirmDeleteItem = () => {
    Swal.fire({
      title: '您確定要刪除此項商品嗎?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: '確定刪除',
      denyButtonText: `取消刪除`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('刪除成功!', '', 'success')
        router.push(`/res/item-management/delete-item/${v.food_id}`)
      } else if (result.isDenied) {
        Swal.fire('取消刪除', '', 'info')
      }
    })
  }

  const deleteItem = async () => {

  }


  return (
    <>
      <h3 className="container">商品管理</h3>
      <div className={`container-xxl-fluid container container-sm-fluid d-flex flex-column ${styles.formbgc} p-3 col-10 border border-4 rounded-4 border-black`}>
        <div className='row'>
          <div className='col-xxl-12 col-sm-12'>

            <div className="d-flex justify-content-between mt-3">
              <div className="">
                <Link href={`/res/add-item`} className='me-3'><Btn text="新增商品" /></Link>

                <button type="button" className='me-3 btn btn-warning' onClick={newToOld}>商品排序:由新到舊</button>
                <button type="button" className='me-3 btn btn-warning' onClick={OldToNew}>商品排序:由舊到新</button>

                <select value={foodCate} onChange={matchList}>
                  <option value="">---請選擇分類---</option>
                  {foodCateOptions.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                  })}
                </select>

              </div>
              <div>
                <Input label="搜尋商品" placeholder="請輸入搜尋文字" />
              </div>
            </div>

            <div className="mt-3">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a className="page-link">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </div>

            <div className="">
              <table className="table mt-3 border border-4 rounded-4 border-black table-danger table-striped">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      商品名稱
                    </th>
                    <th scope="col" className="text-center">
                      商品敘述
                    </th>
                    <th scope="col" className="text-center">
                      價格
                    </th>
                    <th scope="col" className="text-center">
                      分類
                    </th>
                    <th scope="col" className="text-center">
                      商品圖片
                    </th>
                    <th scope="col" className="text-center">
                      商品備註
                    </th>
                    <th scope="col" className="text-center">
                      商品建立時間:
                    </th>
                    <th scope="col" className="text-center">
                      編輯商品
                    </th>
                    <th scope="col" className="text-center">
                      下架商品
                    </th>
                    <th scope="col" className="text-center">
                      刪除商品
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {foodItem.map((v, i) => {

                    return (
                      <tr className="" key={i}>
                        <td className="text-center">{v.food_title}</td>
                        <td className="text-center">{v.food_des}</td>
                        <td className="text-center">{v.food_price}</td>
                        <td className="text-center">{v.foodCateToString}</td>
                        <td className={`text-center ${styles.imgSize}`}>
                          <img src={`${imgLink}${v.food_img}`} className={`${styles.imgSize}`}></img>
                        </td>
                        <td className="text-center">{v.food_note}</td>
                        <td className={`text-center`}>{v.create_time}</td>
                        <td className={`text-center`}>
                          <Link href={'/res/edit-item'}></Link>
                          {/* <Btn text="編輯商品" /> */}
                          <Link href={`/res/item-management/edit-item/${v.food_id}`}>
                            <button type="button" className='me-3 btn btn-warning' onClick={(e) => {
                              router.push(`/res/item-management/edit-item/${v.food_id}`)
                            }}>編輯商品</button>
                          </Link>
                          {/* <Link href={`/res/item-management/edit-item?food_id=${v.food_id}`}>
                        <button type="button" className='me-3 btn btn-warning' onClick={(e) => {
                          router.push(`/res/item-management/edit-item?food_id=${v.food_id}`)
                        }}>編輯商品</button>
                      </Link> */}
                        </td>
                        <td className={`text-center`}> <button type="button" className='me-3 btn btn-warning' onClick={(e) => { }}>下架商品</button></td>
                        <td className="text-center">
                          <button type="button" className='me-3 btn btn-warning' onClick={() => {
                            Swal.fire({
                              title: '您確定要刪除此項商品嗎?',
                              showDenyButton: true,
                              showCancelButton: false,
                              confirmButtonText: '確定刪除',
                              denyButtonText: `取消刪除`,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire('刪除成功!', '', 'success')
                                fetch(`http://localhost:3003/res/item-management/deleteItem/${v.food_id}`,
                                  { method: 'DELETE', })
                                  .then(r => r.json())
                                  .then(data => console.log(data))
                                location.reload()
                                // router.push(`/res/item-management/delete-item/${v.food_id}`)

                              } else if (result.isDenied) {
                                Swal.fire('取消刪除', '', 'info')
                              }
                            })
                          }}>刪除商品</button>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
