"use client";

import React, { useState } from 'react';

export default function Admin() {
    return (
        <div className="admin-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <span>Página de administração</span>
                </div>
            </nav>
            <h1>Administração do Site</h1>
            <div className="user-options">
                <button onClick={() => alert('Criar usuário')}>Criar Usuário</button>
                <button onClick={() => alert('Apagar usuário')}>Apagar Usuário</button>
            </div>
        </div>
    );

    
}



