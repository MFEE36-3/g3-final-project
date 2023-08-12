import styles from '@/styles/member/mem-body.module.css';
import styles2 from '@/styles/member/mem-form.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Input from '@/components/common/input';
import AuthContext from '@/context/AuthContext';
import { useState, useEffect, useContext, useRef } from 'react';
import MemBtn from '@/components/member/mem-Btn';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaD } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import Head from 'next/head';

export default function MemForm() {
  const [account, setAccount] = useState('※必填');
  const [password, setPassword] = useState('※必填');
  const [name, setName] = useState('※必填');
  const [nickName, setNickName] = useState('※必填');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);

  const checkAccount = (e) => {
    const inputValue = e.target.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(inputValue)) {
      setAccount('※格式錯誤');
    } else {
      setAccount('');
    }
  };

  const checkPassword = (e) => {
    const inputValue = e.target.value;
    // const chinesePattern = /[\u4E00-\u9FFF]/;
    if (inputValue.length < 4) {
      setPassword('※格式錯誤');
    } else {
      setPassword('');
    }
  };

  const checkName = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 2) {
      setName('※格式錯誤');
    } else {
      setName('');
    }
  };

  const checkNickName = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 2) {
      setNickName('※格式錯誤');
    } else {
      setNickName('');
    }
  };

  const checkMobile = (e) => {
    const inputValue = e.target.value;
    const numericPattern = /^[0-9]*$/;
    if (inputValue.length > 0) {
      if (!numericPattern.test(inputValue)) {
        setMobile('※格式錯誤');
      } else if (inputValue.length !== 10) {
        setMobile('※格式錯誤');
      } else if (inputValue[0] !== '0') {
        setMobile('※格式錯誤');
      } else if (inputValue[1] !== '9') {
        setMobile('※格式錯誤');
      } else {
        setMobile('');
      }
    } else {
      setMobile('');
    }
  };

  const formRef = useRef(null);
  const router = useRouter();

  const upLoadImg = (e) => {
    e.preventDefault();
    const fileList = e.target.files;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  const removeData = (e) => {
    setAccount('※必填');
    setPassword('※必填');
    setName('※必填');
    setNickName('※必填');
    setAddress('');
    setMobile('');
    setFile(null);

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
    e.preventDefault();
  };

  const sendData = (e) => {
    if (
      account !== '' ||
      password !== '' ||
      name !== '' ||
      nickName !== '' ||
      mobile !== ''
    ) {
      Swal.fire({
        title: '資料還沒填好唷',
        timer: 1500,
        icon: 'error',
        showConfirmButton: false,
      });
      return;
    }

    e.preventDefault();

    const fd = new FormData(formRef.current);
    // fd.append('photo', file);
    fetch(process.env.API_SERVER + '/member/add', {
      method: 'POST',
      body: fd,
      headers: {},
    })
      .then((res) => console.log(res.json()))
      .then(
        Swal.fire({
          title: '會員創建完成',
          timer: 1500,
          icon: 'success',
          showConfirmButton: false,
        })
      )
      .then(
        setTimeout(() => {
          router.push('/');
        }, 1000)
      );
  };

  return (
    <>
      <Head>
        <title>食GOEAT! </title>
      </Head>
      <div className={styles.body}>
        <div className={styles.container}>
          <div>
            <form ref={formRef} className={styles2.form}>
              <div className={styles2.title}>註冊會員</div>

              <div className={styles2.formArea}>
                <label htmlFor="email" className={styles2.label}>
                  帳號 :{' '}
                </label>
                <input
                  id="email"
                  name="account"
                  type="email"
                  className={styles2.input}
                  onBlur={checkAccount}
                  placeholder="請輸入您的電子信箱"
                ></input>
                <div className={styles2.hide}>{account}</div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="email" className={styles2.label}>
                  密碼 :{' '}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={styles2.input}
                  onBlur={checkPassword}
                  placeholder="至少4個英文或數字"
                ></input>
                <div className={styles2.hide}>{password}</div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="text" className={styles2.label}>
                  姓名 :{' '}
                </label>
                <input
                  id="text"
                  name="name"
                  type="text"
                  className={styles2.input}
                  onBlur={checkName}
                  placeholder="至少2個中、英、數字"
                ></input>
                <div className={styles2.hide}>{name}</div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="text" className={styles2.label}>
                  暱稱 :{' '}
                </label>
                <input
                  id="text"
                  name="nickname"
                  type="text"
                  className={styles2.input}
                  onBlur={checkNickName}
                  placeholder="至少2個中、英、數字"
                ></input>
                <div className={styles2.hide}>{nickName}</div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="telephone" className={styles2.label}>
                  手機 :{' '}
                </label>
                <input
                  id="text"
                  name="mobile"
                  type="text"
                  className={styles2.input}
                  onBlur={checkMobile}
                ></input>
                <div className={styles2.hide}>{mobile}</div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="address" className={styles2.label}>
                  地址 :{' '}
                </label>
                <input
                  id="text"
                  name="address"
                  type="text"
                  className={styles2.input}
                ></input>
                <div className={styles2.hide}>{address}</div>
              </div>

              <div className={styles2.formArea2}>
                <label htmlFor="tdate" className={styles2.birth}>
                  生日 :{' '}
                </label>
                <input
                  id="date"
                  name="birthday"
                  type="date"
                  className={styles2.input2}
                  max={dayjs(Date.now()).format('YYYY-MM-DD')}
                  // defaultValue={`2000-01-01`}
                ></input>
                <div className={styles2.hide}></div>
              </div>

              <div className={styles2.formArea}>
                <label htmlFor="tdate" className={styles2.label}>
                  照片 :{' '}
                </label>
                <input
                  id="file"
                  name="photo"
                  type="file"
                  className={styles2.file}
                  onChange={upLoadImg}
                ></input>
              </div>
              <div>
                {file ? (
                  <div className={styles2.img}>
                    <Image
                      src={file}
                      width={300}
                      height={300}
                      alt=""
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div style={{ display: 'flex' }}>
                <div className={styles2.formBtn}>
                  <MemBtn text={'取消重填'} onClick={removeData}></MemBtn>
                </div>
                <div className={styles2.formBtn}>
                  <MemBtn text={'確認送出'} onClick={sendData}></MemBtn>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
