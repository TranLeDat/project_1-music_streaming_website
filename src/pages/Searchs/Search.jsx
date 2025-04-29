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

    

    

    const handleSearchByArtist = async (values)=>{
        try {
            const res = await searchApi.getSearchByArtist({query: values.search});
            setSearchResults(res || []);
            console.log('Artist search results:', res);
            setIsSearch(true);
        } catch (error) {
            console.log('Failed to fetch artist', error)
            setSearchResults([]); // Gặp lỗi cũng reset về []
        setIsSearch(true);
        }
    }
    const handleSearchBySong = async (values)=>{
        try {
            const res = await searchApi.getSearchBySong({query: values.search});
            setSearchResults(res || []);
            setIsSearch(true);
            console.log('Song search results:', res);
        } catch (error) {
            console.log('Failed to fetch artist', error)
            setSearchResults([]); // Gặp lỗi cũng reset về []
            setIsSearch(true);
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
                    <SearchForm
                        label="Search by Song Name"
                        onSubmit={handleSearchBySong}
                    />
                </div>
                

                <div className={clsx(styles.category)}>
                    {isSearch ? (
                        <div>
                            {Array.isArray(searchResults) && searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <SearchFeature key={result.id} result={result} />
                                ))
                                ) : (
                                <p>Không tìm thấy kết quả.</p>
                            )}
                        </div>
                    ) : (
                        <div>
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