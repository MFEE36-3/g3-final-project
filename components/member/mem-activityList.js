import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

export function MemActivityList1({ List1 }) {
  return <Image src={'/member/car0.png'} width={1100} height={600} alt="" />;
}

export function MemActivityList2({ List2 }) {
  return '我點的餐';
}

export function MemActivityList3({ List3 }) {
  return '我下的單';
}
