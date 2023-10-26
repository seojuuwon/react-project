import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies, getTopRatedMovies, getUpComingMovies } from "../redux/movieSlice";
import axios from "../axios";

import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";

import BeatLoader from "react-spinners/BeatLoader";

const Home = () => {
    // 기존에 있던 session Movie를 지워버림
    sessionStorage.removeItem("movie");

    sessionStorage.removeItem("searchResult");
    sessionStorage.removeItem("searchType");

    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movies);
    const [loading, setLoading] = useState(true);

    /** 화면이 렌더링 되자마자, API를 가져올 것 */
    useEffect(() => {
        const populatApi = axios.get("/popular?language=ko-KR&page=1");
        const topRatedApi = axios.get("/top_rated?language=ko-KR&page=1");
        const upComingApi = axios.get("/upcoming?language=ko-KR&page=1");

        // Promise.all을 사용하여 여러 번의 API 요청을 병렬로 처리
        // then을 순차적으로 실행
        Promise.all([populatApi, topRatedApi, upComingApi])
            .then((res) => {
                console.log(res);

                // API에서 받아온 데이터를 store 안에 넣고싶음! -> useDispatch
                dispatch(getPopularMovies(res[0].data));
                dispatch(getTopRatedMovies(res[1].data));
                dispatch(getUpComingMovies(res[2].data));
            })
            .then(() => {
                setLoading(false);
            });
    }, []);

    // // store에 값이 잘 들어갔는지 확인해보는 용도
    // useEffect(() => {
    //     console.log('store의 상태', popularMovies, topRatedMovies, upComingMovies)
    // }, [popularMovies, topRatedMovies, upComingMovies]);


    // loading이 true면, loading 스피너를 보여주고, false면 데이터를 보내준다.
    // true : 데이터 도착 전
    // false : 데이터 도착 후 or 에러가 났을 때
    if (loading) {
        return <BeatLoader color="#e50914" loading={loading} size={13} speedMultipliter={1} className="loading"></BeatLoader>;
    }

    return (
        <div>
            {/* LifeCycle 생명주기 - 컴포넌트
                - popularMovies라는 애가 존재하면? -> result
                - 존재하지 않는다면 배너 띄울 필요 X

                A AND B, && 조건부 연산자
            */}
            {/* 로딩스피너를 만들면 데이터가 안 왔을 때는 로딩만 리턴이 되기 때문에 별도로 조건부 처리를 해줄 필요가 없다. */}
            {/* {popularMovies.results &&  */}
            <Banner movie={popularMovies.results[8]}></Banner>
            {/* } */}

            <p className="carousel">Popular Movies</p>
            {/* 카드 슬라이드 */}
            <MovieSlide movies={popularMovies.results} type="popularMovies"></MovieSlide>

            <p className="carousel">TopRated Movies</p>
            {/* 카드 슬라이드 */}
            <MovieSlide movies={topRatedMovies.results} type="topRatedMovies"></MovieSlide>

            <p className="carousel">UpComing Movies</p>
            {/* 카드 슬라이드 */}
            <MovieSlide movies={upComingMovies.results} type="upComingMovies"></MovieSlide>
        </div>
    );
};

export default Home;
