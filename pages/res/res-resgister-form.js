import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterFormComponent from '@/components/res/resgister-form/register-form';
import RegisterForm1 from '@/components/res/resgister-form/register-form1';

export default function RegisterForm() {
  return (
    <>
      <div className="container">RegisterForm</div>
      {/* <RegisterFormComponent /> */}
      <RegisterForm1 />
    </>
  );
}


