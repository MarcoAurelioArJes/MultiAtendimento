"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Sair() {
    const router = useRouter();
    
    useEffect(() => {
        Cookies.remove("tokenDeAcesso");
        router.push("/login")
        toast.success("Logout efetuado com sucesso!!!");
    }, []);
    
    return (
        <>
        </>
    );
};