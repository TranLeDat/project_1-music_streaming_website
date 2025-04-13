import React from "react";
import clsx from 'clsx';
import styles from './Toolbar.module.scss';
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function Toolbar() {
  const [activeItem, setActiveItem] = useState();
  const location = useLocation();

  const menuItem = [
      { id: 'Home', icon: "fa-solid fa-house", link: '/', text: 'Trang chủ' },
      { id: 'Search', icon: "fa-solid fa-magnifying-glass", link: '/search', text: 'Tìm kiếm' },
      { id: 'Favorites', icon: "fa-regular fa-heart", link: '/favorite', text: 'Yêu thích' },
      { id: 'Library', icon: "fa-regular fa-folder", link: '/library', text: 'Thư viện' },
      { id: 'Setting', icon: "fa-solid fa-gear", link: '/setting', text: 'Cài đặt' },
      { id: 'account', icon: "fa-solid fa-arrow-right-from-bracket", link: '/account', text: 'Đăng nhập' },
  ];

  useEffect(() => {
      let currentItem;

      if (location.pathname.startsWith('/foryou')) {
          currentItem = menuItem.find(item => item.id === 'account');
      } else if (location.pathname.startsWith('/account')) {
          currentItem = menuItem.find(item => item.id === 'account');
      } else if (location.pathname.startsWith('/library')) {
          currentItem = menuItem.find(item => item.id === 'Library');
      } else {
          currentItem = menuItem.find(item => item.link === location.pathname);
      }

      if (currentItem) {
          setActiveItem(currentItem.id);
      }
  }, [location.pathname]);

  return (
      <nav id='nav' className={clsx(styles.nav)}>
          <ul>
              {menuItem.map((item) => (
                  <li
                      key={item.id}
                      className={clsx({
                          [styles.active]: activeItem === item.id,
                      })}
                  >
                      <Link to={item.link} className={clsx(styles.link)}>
                          <i className={item.icon}></i>
                          <span>{item.text}</span>
                      </Link>
                  </li>
              ))}
          </ul>
      </nav>
  );
}

export default React.memo(Toolbar);