import React from 'react';
import MemberBar from '@/components/common/member/member-bar';
import MemberPackage from '@/components/common/member/member-package';
import MemberActivity from '@/components/common/member/member-activity';
import MemberActivityLong from '@/components/common/member/member-activity-long';
import styles1 from '@/styles/member-css/member-body.module.css';
import styles2 from '@/styles/member-css/member-container.module.css';
import styles3 from '@/styles/member-css/member-package.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function aandex() {
  const indexFlex = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  const indexBtm = {
    width: '47%',
  };

  return (
    <div className={`${styles1.body}`}>
      <div className={styles2.container}>
        <MemberBar />
        <div className={styles3.package}>
          <div style={indexFlex}>
            <MemberPackage />
            <Image src="/member/cookie.png" width={250} height={250} alt="" />
          </div>
          <div>
            <MemberActivityLong content={'我的活動'} />
          </div>
          <div style={indexFlex}>
            <div style={indexBtm}>
              <MemberActivity content={'消費趨勢'} />
            </div>
            <div style={indexBtm}>
              <MemberActivity content={'本月走向'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
