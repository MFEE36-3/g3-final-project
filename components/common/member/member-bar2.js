import styles from '@/styles/member-css/member-bar.module.css';
import { useState } from 'react';

export default function MemberBar2({ Info }) {
  const [isHovered, setIsHovered] = useState(false);

  const MouseEnter = () => {
    setIsHovered(true);
  };

  const MouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onMouseEnter={MouseEnter}
      onMouseLeave={MouseLeave}
      className={isHovered ? styles.memBtnClick : styles.memBtn}
    >
      {Info}
    </button>
  );
}
