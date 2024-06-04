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
            </main>

        </>

    );


}



