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

export default function MemForm() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);

  const checkAccount = (e) => {
    const inputValue = e.target.value;
    if (!inputValue.includes('@')) {
      setAccount('※信箱格式錯誤');
    } else {
      setAccount('');
    }
  };

  const checkPassword = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 4) {
      setPassword('※密碼格式錯誤');
    } else {
      setPassword('');
    }
  };

  const checkName = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 1) {
      setName('※請填寫姓名');
    } else {
      setName('');
    }
  };

  const checkNickName = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 1) {
      setNickName('※請填寫姓名');
    } else {
      setNickName('');
    }
  };

  const checkMobile = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length !== 10) {
      setMobile('※手機格式錯誤');
    } else {
      setMobile('');
    }
  };

  const checkAddress = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length < 1) {
      setAddress('※請填寫地址');
    } else {
      setAddress('');
    }
  };

  const formRef = useRef(null);
  const router = useRouter();

  const upLoadImg = (e) => {
    e.preventDefault();
    const fileList = e.target.files;
    // console.log(fileList[0].name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(fileList[0]);
  };

  const removeData = (e) => {
    setAccount('');
    setPassword('');
    setName('');
    setNickName('');
    setAddress('');
    setMobile('');
    setFile(null);

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => (input.value = ''));
    e.preventDefault();
  };

  const sendData = (e) => {
    e.preventDefault();

    const fd = new FormData(formRef.current);
    console.log(fd);
    fetch(process.env.API_SERVER + '/addmember', {
      method: 'POST',
      body: fd,
      // headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
    })
      .then((res) => console.log(res.json()))
      .then(router.push('/'));
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div>
          <form ref={formRef} className={styles2.form}>
            <div className={styles2.title}>註冊會員</div>

            <div className={styles2.formArea}>
              <label htmlFor="email">帳號 : </label>
              <input
                id="email"
                name="account"
                type="email"
                className={styles2.input}
                onBlur={checkAccount}
                placeholder="請輸入電子信箱"
              ></input>
              <div className={styles2.hide}>{account}</div>
            </div>

            <div className={styles2.formArea}>
              <label htmlFor="email">密碼 : </label>
              <input
                id="password"
                name="password"
                type="password"
                className={styles2.input}
                onBlur={checkPassword}
                placeholder="至少4位數的英文或數字"
              ></input>
              <div className={styles2.hide}>{password}</div>
            </div>

            <div className={styles2.formArea}>
              <label htmlFor="text">姓名 : </label>
              <input
                id="text"
                name="name"
                type="text"
                className={styles2.input}
                onBlur={checkName}
              ></input>
              <div className={styles2.hide}>{name}</div>
            </div>

            <div className={styles2.formArea}>
              <label htmlFor="text">暱稱 : </label>
              <input
                id="text"
                name="nickname"
                type="text"
                className={styles2.input}
                onBlur={checkNickName}
              ></input>
              <div className={styles2.hide}>{nickName}</div>
            </div>

            <div className={styles2.formArea}>
              <label htmlFor="telephone">手機 : </label>
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
              <label htmlFor="address">地址 : </label>
              <input
                id="text"
                name="address"
                type="text"
                className={styles2.input}
                onBlur={checkAddress}
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
              ></input>
              <div className={styles2.hide}></div>
            </div>

            <div className={styles2.formArea}>
              <label htmlFor="tdate">上傳照片 : </label>
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
                  <Image src={file} width={300} height={300} alt="" />
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
  );
}
