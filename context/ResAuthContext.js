import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// 1、export default createContext
const ResAuthContext = createContext({});
export default ResAuthContext;

// 2、export noLoginState
export const noLoginState = {
  id: 0,
  account: '',
  sid: '',
  token: '',
};

// 3、export ContextProvider
export const ResContextProvider = function ({ children }) {
  const router = useRouter();
  const [resAuth, setResAuth] = useState({ ...noLoginState });

  const resLogout = () => {
    localStorage.removeItem('res-auth');
    setResAuth(noLoginState);
    // router.push('/login');
  };

  useEffect(() => {
    const str = localStorage.getItem('res-auth');
    if (str) {
      try {
        const obj = JSON.parse(str);
        setResAuth(obj);
      } catch (ex) {
        console.log(ex);
      }
    }
  }, []);

  return (
    <ResAuthContext.Provider value={{ resAuth, setResAuth, resLogout }}>
      {children}
    </ResAuthContext.Provider>
  );
};
