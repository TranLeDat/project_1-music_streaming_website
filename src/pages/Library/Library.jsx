import styles from "./Library.module.scss";
import clsx from "clsx";
import NotLogin from "../../components/NotLogin/NotLogin";
import Album from "../../components/Albums/Album/Album";
import { useAuth } from "../../components/AuthContext/AuthContext";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import libraryApi from "../../api/libraryApi";

function Library() {
  const [librarys, setLibrarys] = useState([]);
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isInSubRoute = location.pathname !== "/library";

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await libraryApi.getLibrary();
        console.log(">>> check api library: ", res);
        setLibrarys(res);
      } catch (error) {
        console.log("Failed to fetch lib", error);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <div className={clsx(styles.container)}>
      {isLoggedIn ? (
        <div className={clsx(styles.albums)}>
          {!isInSubRoute ? (
            <ul className={clsx(styles.frameLogin)}>
              {librarys.map((library) => (
                <li key={library.id} className={clsx(styles.album)}>
                  <Album library={library} />
                </li>
              ))}
            </ul>
          ) : (
            <Outlet />
          )}
        </div>
      ) : (
        <div className={clsx(styles.notLogin)}>
          <NotLogin />
        </div>
      )}
    </div>
  );
}

export default Library;
