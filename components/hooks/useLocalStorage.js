import { useEffect, useState } from "react";

export default function useLocalStorage(key, init = {}) {
  const [val, setVal] = useState(init);

  useEffect(() => {
    const str = localStorage.getItem(key);
    let data = {};
    if (str) {
      try {
        data = JSON.parse(str);
      } catch (ex) {}
    }
    setVal(data);
  }, [key]);

  const saveVal = (v) => {
    localStorage.setItem(key, JSON.stringify(v));
    setVal(v);
  };

  return [val, saveVal];
}
