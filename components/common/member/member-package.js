import React from 'react';

export default function MemberPackage() {
  const packageStyle = {
    width: '60%',
    height: '250px',
    backgroundColor: 'rgba(142, 142, 142, 0.3)',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: '14px',
    fontWeight: '800',
    boxShadow: 'inset -2px -2px 2px rgba(0, 0, 0, 0.5)',
  };

  const packageFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  const packageMoney = {
    marginTop: '20px',
    fontSize: '36px',
    fontWeight: '900',
  };

  const packageBtn = {
    width: '60px',
    borderRadius: '8px',
    fontWeight: '800',
    padding: '5px',
    color: 'white',
    backgroundColor: 'rgba(120, 120, 120, 1)',
    border: 'none',
  };

  return (
    <div style={packageStyle}>
      <div style={packageFlex}>
        <div>我的錢包</div>
        <div>帳號:asiagodtone@gmail.com</div>
      </div>

      <div style={packageMoney}>NT$ 7414</div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button style={packageBtn}>儲值+</button>
      </div>
    </div>
  );
}
