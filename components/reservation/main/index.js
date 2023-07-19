import React from 'react';
import Top5 from './top5';
import MainContent from './maincontent';
import { useRouter } from 'next/router';
import ResultContent from './resultcontent';

export default function Main() {

  const router = useRouter();
  return (
    <>

      <Top5 />
      <MainContent />

    </>
  );
}
