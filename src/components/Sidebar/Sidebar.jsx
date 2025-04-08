import Logo from "./Logo/Logo";
import Toolbar from "./ToolBar/ToolBar";
import styles from "./Sidebar.module.scss";


function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <div className={styles.logo}>
            <Logo />
        </div>
        <div className={styles.toolbar}>
            <Toolbar/>
        </div>
    </div>
  );
}

export default Sidebar;
