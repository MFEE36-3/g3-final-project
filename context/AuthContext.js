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
  //預設auth物件暫時沒有資料
  const [auth, setAuth] = useState({ ...noLoginState });

  // 創建一個登出函式會清空localStorage，接著把auth物件清空
  const logout = () => {
    localStorage.removeItem('auth');
    setAuth(noLoginState);
  };

  // 每次重新渲染會時抓取localStorage內的auth資料裝在auth裡面
  // auth資料是json型態，所以要用JSON.parse解析
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      try {
        const obj = JSON.parse(str);
        setAuth(obj);
      } catch (ex) {
        ('嘻嘻嘻我最喜歡玩原神啦');
      }
    }
  }, []);

  // 完成建立Context.Provider頂層元件
  // 可以傳遞auth狀態、setAuth控制狀態、登出函式給任何子元件
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
