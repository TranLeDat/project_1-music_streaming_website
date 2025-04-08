import React from "react";
import clsx from 'clsx'
import styles from './Toolbar.module.scss'
import { useState } from "react";

export default function Toolbar(){
    const [activeItem, setActiveItem] = useState();
    
    const menuItem = [
        {id: 'Home', icon : "fa-solid fa-house", text: 'Trang chủ'},
        {id: 'Search', icon : "fa-solid fa-magnifying-glass", text: 'Tìm kiếm'},
        {id: 'Favorites', icon : "fa-regular fa-heart", text: 'Yêu thích'},
        {id: 'Library', icon : "fa-regular fa-folder", text: 'Thư viện'},
        {id: 'Setting', icon : "fa-solid fa-gear", text: 'Cài đặt'},
        {id: 'account', icon : "fa-solid fa-arrow-right-from-bracket", text: 'Đăng nhập'},
    ]
    const handleSelected = (id) =>{
        setActiveItem(id);
    }

    return (
        <>
            <nav id='nav' className={clsx(styles.nav)}>
                <ul>
                    {menuItem.map((item) =>(
                        <li key={item.id} 
                            onClick={() => handleSelected(item.id)}
                            className={clsx({
                                [styles.active] : activeItem === item.id,
                            })}
                        >
                            <i className={item.icon}></i>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

