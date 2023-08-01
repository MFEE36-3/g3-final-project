import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Btn from '@/components/common/btn';
import Input from '@/components/common/input';
import LoginComponent from "@/components/res/login/login-component";

export default function Login(){
    return <>
        <h3 className="container">Login</h3>
        <LoginComponent />
    </>
}