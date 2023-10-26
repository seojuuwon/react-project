import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import BeatLoader from "react-spinners/BeatLoader";

const Movies = () => {
    // header에서 검색한 결과 가져오기
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    console.log("searchParams -----", search);

    // redux에 있는 데이터 가지고 옴
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movies);
    const [searchResult, setSearchResult] = useState([]);
    const [type, setType] = useState("");
    const [loading, setLoading] = useState(true);

    const storeSearchResult = (results, type) => {
        setSearchResult(results);
        setType(type);
        sessionStorage.setItem("searchResult", JSON.stringify(results));
        sessionStorage.setItem("searchType", type);
        setLoading(false);
    };

    const getSearchResult = () => {
        // popularMovies 배열에 들어있는 item.title이 search를 포함하고 있으면 popularMovies 배열로 구성
        const popularResults = popularMovies.results.filter((item) => item.title.includes(search));
        const topRatedResults = topRatedMovies.results.filter((item) => item.title.includes(search));
        const upComingResults = upComingMovies.results.filter((item) => item.title.includes(search));

        if (popularResults.length > 0) {
            storeSearchResult(popularResults, "popularMovies");
        } else if (topRatedResults.length > 0) {
            storeSearchResult(topRatedResults, "topRatedMovies");
        } else if (upComingResults.length > 0) {
            storeSearchResult(upComingResults, "upComingMovies");
        }
    };

    useEffect(() => {
        const sessionList = JSON.parse(sessionStorage.getItem("searchResult"));
        const sessionType = sessionStorage.getItem("searchType");

        if (popularMovies) {
            if (sessionList != null) {
                setSearchResult(sessionList);
                setType(sessionType);
                setLoading(false);

                console.log(searchResult, type);
            } else {
                getSearchResult();
            }
        }
    }, [search]);

    console.log(type);
    console.log(searchResult);

    if (loading) {
        return <BeatLoader color="#e50914" loading={loading} size={13} speedMultipliter={1} className="loading"></BeatLoader>;
    }

    return (
        <div className="movie-list">
            <h1>검색 결과</h1>
            {searchResult.map((item) => (
                <MovieCard item={item} type={type} key={item.id} />
            ))}
        </div>
    );
};

export default Movies;
