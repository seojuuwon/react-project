import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ movies, type }) => {
    let url = "https://www.themoviedb.org/t/p/w355_and_h200_multi_faces" + movies.poster_path;

    return (
        <div style={{ backgroundImage: `url(${url})` }} className="card-item">
            {/* <img src={url} className="carousel-img"></img> */}

            <Link to={`/movies/${movies.id}?type=${type}`}>
                <div className="overlay">
                    <h1>{movies.title}</h1>
                    <div>
                        <span>평점 {movies.vote_average}</span>
                        <span>
                            {/* react-bootstrap Badge */}
                            {movies.adult ? <Badge bg="secondary">전체관람가</Badge> : <Badge bg="success">청소년 관람 불가</Badge>}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
