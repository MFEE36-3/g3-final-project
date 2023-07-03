import React from 'react';

export default function MemberTag({ content }) {
  const tag = {
    width: '100%',
    height: '50px',
    backgroundColor: '#921010',
    color: 'white',
    fontSize: '20px',
    fontWeight: '800',
    borderRadius: '7px',
    display: 'flex',
    fleDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset -5px -5px 5px rgba(0, 0, 0, 0.6)',
  };
  return <div style={tag}>{content}</div>;
}
