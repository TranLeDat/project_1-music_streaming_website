import clsx from "clsx";
import styles from './Search.module.scss'
import {categories} from  "../../../src/data"
import Category from "../../components/Category/Category";
import { useState } from "react";
import SearchForm from "../../components/searchField/searchForm";

import searchApi from "../../api/searchApi";
import SearchFeature from "./SearchFeature/SearchFeature";


function Search(){

    const [isSearch, setIsSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [hasMove, setHasMove] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; 


    
    const handleSearchByArtist = async (values)=>{
        try {
            const res = await searchApi.getSearchByArtist({
                query: values.search,
                _limit : limit,
                _page: 1,
            });
            setSearchResults(res || []);
            setSearchQuery(values.search);
            setCurrentPage(1)
            console.log('Artist search results:', res);
            setIsSearch(true);
            setHasMove((res || []).length === limit);
        } catch (error) {
            console.log('Failed to fetch artist', error)
            setSearchResults([]);
            setIsSearch(true);
            setHasMove(false) 
            setIsSearch(true);
        }
    }

    const handleMove = async ()=>{
        const nextPage = currentPage + 1;

        try {
            const res = await searchApi.getSearchByArtist({
                query: searchQuery,
                _page: nextPage,
                _limit: limit,
            });

            const newTracks = res || [];
            setSearchResults((prev)=> [...prev, ...newTracks]);
            setCurrentPage(nextPage);
            setHasMove(newTracks.length === limit)

        } catch (error) {
            console.log('Failed to fetch data move', error);
            setHasMove(false);
        }
    }

    return(
        <>
            <div className={clsx(styles.categories)}>
                <h1 className={clsx(styles.categoryTitle)}>Duyệt tìm tất cả</h1>
                <div className={clsx(styles.searchBars)}>
                    <SearchForm
                        label="Search by Artist"
                        onSubmit={handleSearchByArtist}
                    />
                </div>
                

                <div className={clsx(styles.category)}>
                    {isSearch ? (
                        <div className={clsx(styles.search)}>
                            <div className={clsx(styles.sreachList)}>
                                {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <SearchFeature key={result.id} result={result} />
                                    ))
                                    ) : (
                                    <p className={clsx(styles.searchTitle)}>Không tìm thấy kết quả.</p>
                                )}
                            </div>
                            {hasMove && (
                                <div className={clsx(styles.move)}>
                                    <button className={clsx(styles.btnMove)}  onClick={handleMove}>Thêm nữa</button>
                                </div>
                            )}
                        </div>
                        
                    ) : (
                        <div className={clsx(styles.genre)}>
                        {categories.map((category, index) => (
                            <Category key={index} category={category} />
                        ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export default Search;