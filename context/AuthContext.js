import { createContext, useEffect, useState } from 'react';

//創建一個useContext物件，用於儲存資料與修改狀態，並且可以快速傳遞至任何一個元件
const AuthContext = createContext({});

export default AuthContext;

// 預設一個空物件，欄位是各頁面需要的資料
export const noLoginState = {
  id: 0,
  account: '',
  nickname: '',
  token: '',
};

// 創建一個函式，之後子元件才能引入useContext並使用裡面的資料及修改狀態
export const AuthContextProvider = function ({ children }) {
  // 預設auth物件暫時沒有資料
  const [auth, setAuth] = useState({ ...noLoginState });

  // 創建一個狀態空物件，準備存放基本會員資料給所有頁面使用
  const [memberData, setMemberData] = useState({});

  // 創建一個登出函式會清空localStorage，接著把auth物件清空
  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(noLoginState);
  };

  // 創建一個函式來處理 localStorage 資料的變化邏輯
  const handleLocalStorageChange = () => {
    const str = localStorage.getItem('auth');
    const obj = JSON.parse(str);

    if (obj && obj.token) {
      setAuth(obj);
      // 確保 obj 不為空且包含 token 屬性
      const Authorization = 'Bearer ' + obj.token;
      fetch('http://localhost:3002/member', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMemberData(data[0]);
        });
    }
  };

  useEffect(() => {
    // 這裡是 auth 發生變化時執行的邏輯
    if (auth && auth.token) {
      // 確保 auth 不為空且包含 token 屬性
      const Authorization = 'Bearer ' + auth.token;
      fetch('http://localhost:3002/member', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMemberData(data[0]);
        });
    }
  }, [auth]); // 當 auth 變化時觸發這個 useEffect

  // 完成建立Context.Provider頂層元件
  // 把裝著驗證token的auth、setAuth控制狀態、登出函式、基本會員資料分享給任何子元件
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, memberData, handleLocalStorageChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};
