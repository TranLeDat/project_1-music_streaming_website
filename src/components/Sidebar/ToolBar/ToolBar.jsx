import React from "react";
import clsx from 'clsx';
import styles from './Toolbar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

function Toolbar() {
    const location = useLocation();

    // Xử lý logic riêng cho Disc (xác định nguồn từ state)
    const state = location.state || {};
    const pathname = location.pathname;

    // Xác định menu nào cần active
    const getActiveMenuId = () => {
        if (pathname === '/disc' || pathname === '/client') {
            if (state.source === 'favorite') return 'Favorites';
            if (state.source === 'library') return 'Library';
            if (state.source === 'search') return 'Search';
            if (state.source === 'home') return 'Home';
            if (state.source === 'account' || state.source === 'foryou') return 'account';
        }
    
        if (pathname.startsWith('/favorite')) return 'Favorites';
        if (pathname.startsWith('/library')) return 'Library';
        if (pathname.startsWith('/search')) return 'Search';
        if (pathname.startsWith('/setting')) return 'Setting';
        if (pathname.startsWith('/account') || pathname.startsWith('/foryou')) return 'account';
        return 'Home';
    };
    

    const activeMenuId = getActiveMenuId();

    const menuItem = [
        { id: 'Home', icon: "fa-solid fa-house", link: '/', text: 'Trang chủ' },
        { id: 'Search', icon: "fa-solid fa-magnifying-glass", link: '/search', text: 'Tìm kiếm' },
        { id: 'Favorites', icon: "fa-regular fa-heart", link: '/favorite', text: 'Yêu thích' },
        { id: 'Library', icon: "fa-regular fa-folder", link: '/library', text: 'Thư viện' },
        { id: 'Setting', icon: "fa-solid fa-gear", link: '/setting', text: 'Cài đặt' },
        {
            id: 'account',
            icon: "fa-solid fa-arrow-right-from-bracket",
            link: '/account',
            text: 'Người dùng',
        },
    ];

    return (
        <nav id='nav' className={clsx(styles.nav)}>
            <ul>
                {menuItem.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            to={item.link}
                            className={clsx(styles.link, item.id === activeMenuId && styles.active)}
                        >
                            <i className={item.icon}></i>
                            <span>{item.text}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default React.memo(Toolbar);
