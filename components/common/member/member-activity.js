import React from 'react';
import MemberTag from './member-tag';

export default function MemberActivity({ content }) {
  const activityStyle = {
    width: '100%',
    height: '400px',
    backgroundColor: '#fcc8a1',
    borderRadius: '20px',
    boxShadow: 'inset -5px -5px 5px rgba(123, 123, 123, 0.5)',
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const innerStyle = {
    width: '90%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '15px',
    backgroundColor: '#fefdfb',
    boxShadow: 'inset 2px 2px 2px rgba(123, 123, 123, 0.7)',
  };

  return (
    <div style={activityStyle}>
      <div style={innerStyle}>
        <MemberTag content={content} />
        <div>你好</div>
      </div>
    </div>
  );
}
