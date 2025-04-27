import clsx from "clsx";
import styles from './Search.module.scss'
import {categories} from  "../../../src/data"
import Category from "../../components/Category/Category";


function Search(){
    return(
        <>
            <div className={clsx(styles.categories)}>
                <h1 className={clsx(styles.categoryTitle)}>Duyệt tìm tất cả</h1>
                <div className={clsx(styles.category)}>
                    {categories.map((category, index) =>(
                        <Category key={index} category={category}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Search;