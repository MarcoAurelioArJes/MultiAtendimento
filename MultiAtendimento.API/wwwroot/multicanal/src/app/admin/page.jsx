"use client";
import React, { useState } from 'react';
import Navbar from '@/components/navBar/navBar';
import ListaDeUsuarios from '@/components/admin/listaDeUsuarios';
import ListaDeSetores from '@/components/admin/listaDeSetores'

export default function Admin() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className=''>
                    <ListaDeUsuarios></ListaDeUsuarios>
                    <ListaDeSetores></ListaDeSetores>
                </div>
            </main>

        </>

    );
}



