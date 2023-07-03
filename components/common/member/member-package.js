import React from 'react';

export default function MemberPackage() {
  const packageStyle = {
    width: '60%',
    height: '250px',
    backgroundColor: '#fcc8a1',
    borderRadius: '20px',
    boxShadow: 'inset -5px -5px 5px rgba(123, 123, 123, 0.5)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  return (
    <div style={packageStyle}>
      <div>
        <div>我的錢包</div>
        <div>帳號:asiagodtone@gmail.com</div>
      </div>
      <div>NT$ 7414</div>
      <div>+</div>
    </div>
  );
}
