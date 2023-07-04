import styles from '@/styles/member-css/mem-bar.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function MemBarBtn({ Info, url }) {
  const [isHovered, setIsHovered] = useState(false);

  const MouseEnter = () => {
    setIsHovered(true);
  };

  const MouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link
      href={url}
      style={{
        textDecoration: 'none',
      }}
    >
      <button
        onMouseEnter={MouseEnter}
        onMouseLeave={MouseLeave}
        className={isHovered ? styles.memBtnClick : styles.memBtn}
      >
        {Info}
      </button>
    </Link>
  );
}
