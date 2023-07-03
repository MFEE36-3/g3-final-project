import React from 'react';
import MemberBar from '@/components/common/member/member-bar';
import MemberPackage from '@/components/common/member/member-package';
import MemberActivity from '@/components/common/member/member-activity';
import MemberPiechart from '@/components/common/member/member-piechart';
import styles1 from '@/styles/member-css/member-body.module.css';
import styles2 from '@/styles/member-css/member-container.module.css';
import styles3 from '@/styles/member-css/member-package.module.css';
import Image from 'next/image';

export default function index() {
  const indexFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  return (
    <div className={styles1.body}>
      <div className={styles2.container}>
        <MemberBar />
        <div className={styles3.package}>
          <div style={indexFlex}>
            <MemberPackage />
            <Image
              src="/member/asiagodtone01.jpg"
              width={300}
              height={250}
              alt=""
            />
          </div>
          <div>
            <MemberActivity />
          </div>
          <div style={indexFlex}>
            <MemberPiechart />
            <MemberPiechart />
          </div>
        </div>
      </div>
    </div>
  );
}
