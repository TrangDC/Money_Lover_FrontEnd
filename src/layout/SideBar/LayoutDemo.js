import React from 'react';
import SiderBar from "./SideBar";
import HeaderDemo from "./HeaderDemo";
import {Outlet} from "react-router-dom";
import "./sidebar.css"

const LayoutDemo = () => {
    return (
        <div className= "w-screen h-screen">
            <SiderBar/>
            <div className='flex-1'>
                <HeaderDemo/>
                <div className='p-4'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default LayoutDemo;