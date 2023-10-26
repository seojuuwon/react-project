import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import axios from "../axios";
import BeatLoader from "react-spinners/BeatLoader";


const MovieDetail = () => {
    // useParams
    // Route 작성하는 부분에 /:id <- path 작성 .. id값을 가져온다는 말인ㄱ ㅏ..
    const { id } = useParams();

    // useSearchParams
    // url을 작성하는 부분에 ?type=웅앵웅앵
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type");
    console.log(`movie detail ----- id : ${id}, type : ${type}`);

    // const data = useSelector((state) => state.movies[type]);
    // console.log(`movie detail ----- ${type}`, data);
    // const movie = data.results.find((item) => item.id == id);

    // redux에 있는 데이터 가지고 옴
    const { popularMovies, topRatedMovies, upComingMovies } = useSelector((state) => state.movies);
    const [movie, setMovie] = useState();
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(true);

    /** 내가 가져올 영화에 대한 데이터를 추출하는 함수 */
    const getMovieData = () => {
        if (type === "popularMovies") {
            setMovie(popularMovies.results.find((item) => item.id == id));
        } else if (type === "topRatedMovies") {
            setMovie(topRatedMovies.results.find((item) => item.id == id));
        } else {
            setMovie(upComingMovies.results.find((item) => item.id == id));
        }
    };

    /** 내가 선택한 영화에 대한 리뷰를 가져오는 함수 */
    const getReviewData = () => {
        // /{movie.id}/reviews
        axios
            .get(`/${id}/reviews`) // movie.id 로 적어도 됨
            .then((res) => {
                setReview(res.data.results);
            })
            .then(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        // console.log("현재 movie", movie);
        if (movie) {
            // movie라는 state에 새로운 값이 들어가면, 그 값을 sessionStorage 안에 저장
            sessionStorage.setItem("movie", JSON.stringify(movie));
            getReviewData();
        }
    }, [movie]);

    // redux의 값이 가지고 와졌을 때,
    useEffect(() => {
        const sessionMovie = JSON.parse(sessionStorage.getItem("movie"));
        console.log("session Movie", sessionMovie);
        // 세션 안에 값이 존재하면 (이미 클릭한 전적) => 세션 안에 있는 값을 movie 세팅
        if (sessionMovie) {
            setMovie(sessionMovie);
        } else {
            // 세션 안에 값이 없다면 (최초 클릭) => Redux로 가서 movie 세팅
            getMovieData();
        }
    }, [popularMovies.results, topRatedMovies.results, upComingMovies.results, id, type]);

    if (loading) {
        return <BeatLoader color="#e50914" loading={loading} size={13} speedMultipliter={1} className="loading"></BeatLoader>;
    }

    return (
        <div className="movie-detail">
            {movie && (
                <div className="movie-box">
                    <div className="detail-poster" style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path})` }}></div>
                    <br />
                    <div className="detail-item">
                        {/* react-bootstrap Badge */}
                        <div>{movie.adult ? <Badge bg="secondary">전체관람가</Badge> : <Badge bg="success">청소년 관람 불가</Badge>}</div>
                        <h1>{movie.title}</h1>
                        <div>
                            <span>평점 : {movie.vote_average}점</span> <br />
                            <span>개봉일 : {movie.release_date}</span>
                        </div>
                        <div>{movie.overview}</div>
                    </div>

                    <hr />
                    <h2>Review</h2>
                    <div>
                        {review.length > 0 ? (
                            review &&
                            review.map((data) => (
                                <div key={data.id}>
                                    <hr />
                                    <p>{data.content}</p>
                                    <span> 작성자 : {data.author} </span>
                                    <br />
                                    <span> 작성일 : {data.created_at} </span>
                                    
                                </div>
                            ))
                        ) : (
                            <p>등록된 리뷰가 없습니다.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieDetail;
