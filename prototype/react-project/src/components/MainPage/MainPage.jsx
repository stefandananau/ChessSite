import React, { useState } from 'react';
import './MainPage.css';

export default function MainPage(){
    return (
        <div className="main-page">
            <div className="side-menu">
                <nav>
                    <ul>
                        <li><a>Dashboard</a></li>
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
