import { createContext, useEffect, useState } from 'react';

//創建一個useContext物件，用於儲存資料與修改狀態，並且可以快速傳遞至任何一個元件
const AuthContext = createContext({});

export default AuthContext;

// 創建一個函式，之後子元件才能引入useContext並使用裡面的資料及修改狀態
export const AuthContextProvider = function ({ children }) {
  // 預設auth物件暫時沒有資料

  const [auth, setAuth] = useState({});

  // 創建一個登出函式會清空localStorage，接著把auth物件清空
  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({});
  };

  // 每次重新渲染會時抓取localStorage內的auth資料裝在auth裡面
  // auth資料是json型態，所以要用JSON.parse解析
  useEffect(() => {
    const str = localStorage.getItem('auth');
    if (str) {
      const obj = JSON.parse(str);
      const Authorization = 'Bearer ' + obj.token;
      fetch(process.env.API_SERVER + '/member', {
        method: 'GET',
        headers: {
          Authorization,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // 後端回傳的資料後重新渲染+塞入預設物件裡面
          setAuth(data[0]);
        });
    }
  }, []);

  // 完成建立Context.Provider頂層元件
  // 把裝著驗證token的auth、setAuth控制狀態、登出函式、基本會員資料分享給任何子元件
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
