
import clsx from 'clsx'
import styles from './Category.module.scss'


function Category({category}){
    return (
        <>
            <img src={category.img} alt="category" className={clsx(styles.img)} />    
        </>
    )
}

export default Category;