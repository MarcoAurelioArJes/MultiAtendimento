"use client";

import Navbar from '@/components/navBar/navBar';
import React, { useState } from 'react';
import UserList from '@/components/admin/userList';
import SectorList from '@/components/admin/sectorList'

export default function Admin() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <div className=''>
                    <UserList></UserList>
                    <SectorList></SectorList>
                </div>
                <div className="admin-container">
                    <h1>Administração do Site</h1>
                    <div className="user-options">
                        <button onClick={() => alert('Criar usuário')}>Criar Usuário</button>
                        <button onClick={() => alert('Apagar usuário')}>Apagar Usuário</button>
                    </div>
                </div>
            </main>

        </>

    );


}


