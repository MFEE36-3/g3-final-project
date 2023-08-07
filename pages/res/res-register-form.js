import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterFormComponent from '@/components/res/register-form/register-form';
import RegisterForm1 from '@/components/res/register-form/register-form1';
import BlankLayout from '@/components/layout/blank-layout';

export default function RegisterForm() {
  return (
    <>
      <div className="container">RegisterForm</div>
      {/* <RegisterFormComponent /> */}
      <RegisterForm1 />
    </>
  );
}

// RegisterForm.getLayout = BlankLayout


