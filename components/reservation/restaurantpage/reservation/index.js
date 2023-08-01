import Calendar from './calendar'
import DateTime from './datetime';
import InteriorPic from './interior'
import SelectPerson from './person'
import Memo from './memo';
import Swal from 'sweetalert2';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '@/context/AuthContext';

export default function Reservation({ row, date, setDate, time, setTime, person, setPerson, seat, setSeat, memo, setMemo }) {

  const { auth, setAuth, logout } = useContext(AuthContext);
  const router = useRouter();
  // console.log(auth)
  // 當點擊「送出訂位」按鈕時，處理資料提交
  const handleSubmit = () => {
    if (seat) {

      const confirmationText = `
        <div style="display:flex; flex-direction:column;">
          <div style="display:flex;">
            <p>餐廳：</p><p>${row.detail.shop}</p>
          </div>
          <div style="display:flex;">
            <p>日期：</p><p>${date}</p>
          </div>
          <div style="display:flex;">
            <p>時間：</p> <p>${time}</p>
          </div>
          <div style="display:flex; ">
            <p>人數：</p> <p>${person}</p>
          </div>
          <div style="display:flex; ">
            <p>座位：</p> <p>${seat}</p>
          </div>
          <div style="display:flex; ">
            <p>備註：</p> <p>${memo}</p>
          </div>
        <div>`;

      // 使用 sweetalert 顯示提示視窗
      Swal.fire({
        // icon: 'success',
        title: '請確認訂位資訊',
        html: confirmationText,
        customClass: {
          container: 'my-sweetalert-container',
          title: 'my-sweetalert-title',
          confirmButton: 'my-sweetalert-confirm-button',
          cancelButton: 'my-sweetalert-cancel-button',
        },
        showCancelButton: true,
        confirmButtonText: '確定送出',
        cancelButtonText: '返回',
      }).then((result) => {
        if (result.isConfirmed) {
          // 當用戶點擊「確定送出」按鈕時，處理提交資訊
          // 可以在這裡呼叫提交資訊的函式
          // ...

          // 整理要送出的資訊為一個物件
          const reservationData = {
            id: auth.sid, // ?
            shop_id: row.detail.sid,
            date: date,
            time: time,
            person: person,
            seat: seat,
            rating: null,
            memo: memo,
            status: '未完成',
          };

          // 將資料轉換為JSON格式
          const jsonData = JSON.stringify(reservationData);

          // 使用fetch將資料送至後端處理
          fetch(`${process.env.API_SERVER}/reservation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonData,
          })
            .then((response) => response.json())
            .then((data) => {
              // 第二件事：顯示完成視窗
              Swal.fire({
                icon: 'success',
                title: '訂位成功！',
                text: '您的訂位已成功提交。',
                confirmButtonText: '確定',
              }).then(() => {
                // 返回原餐廳畫面
                router.push(`/reservation/${row.detail.sid}`);
              });

              // 提交成功後，設置訂位成功狀態為 true
              setIsReservationSuccess(true);
            })
            .catch((error) => {
              // 處理錯誤
              // ...
            });
        }
      });
    }
    else {
    }


  };


  return (
    <>
      <div className={style.divmb}>
        <p className={style.subtitle}>用餐日期</p>
        <Calendar row={row} date={date} setDate={setDate} setTime={setTime} setPerson={setPerson} setSeat={setSeat} setMemo={setMemo} />
      </div>

      {date ? <div className={style.divmb}>
        <DateTime row={row} date={date} setDate={setDate} time={time} setTime={setTime} person={person} setPerson={setPerson} setSeat={setSeat} setMemo={setMemo} />
      </div> : ''}

      {time ?
        <div className={style.divmb}>
          <p className={style.subtitle}>用餐人數</p>
          <SelectPerson row={row} time={time} setTime={setTime} person={person} setPerson={setPerson} seat={seat} setSeat={setSeat} setMemo={setMemo} />
        </div> : ''}

      {person ?
        <div className={style.divmb}>
          <p className={style.subtitle}>用餐座位</p>
          <InteriorPic row={row} seat={seat} setSeat={setSeat} person={person} date={date} time={time} setMemo={setMemo} />
        </div> : ''}

      {seat ?
        <div className={style.divmb}>
          <p className={style.subtitle}>備註</p>
          <Memo memo={memo} setMemo={setMemo} />
        </div> : ''}

      {seat ?
        <div className={style.divmb}>
          <div className={style.submitdiv}>
            <button className={style.submitbutton} onClick={handleSubmit}>
              送出訂位
            </button>
          </div>
        </div> : ''}
    </>
  )
}
