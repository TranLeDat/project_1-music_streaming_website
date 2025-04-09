import Sidebar from "../../components/Sidebar/Sidebar";
import PlayBox from "../../components/PlayBox/PlayBox";
import HeaderSearch from "../../components/MainContent/HeaderSearch/HeaderSearch";
import clsx from "clsx";
import styles from './Search.module.scss'
import {categories} from  "../../../src/data"
import Category from "../../components/Category/Category";


function Search(){
    return(
        <>
             <div id="container" className={clsx(styles.container)}>
                <div className={clsx(styles.main_left)}>
                    <div className={clsx(styles.sidebar)}>
                        <Sidebar />
                    </div>
                    <div className={clsx(styles.playBox)}>
                        <PlayBox/>
                    </div>
                </div>
                <div className={clsx(styles.main_right)}>
                    <div className={clsx(styles.header)}>
                        <HeaderSearch />
                    </div>
                    <div className={clsx(styles.categories)}>
                        <h1 className={clsx(styles.categoryTitle)}>Duyệt tìm tất cả</h1>
                        <div className={clsx(styles.category)}>
                            {categories.map((category, index) =>(
                                <Category key={index} category={category}/>
                            ))}
                        </div>
                    </div>
                </div>
             </div>
        </>
    )
}

export default Search;