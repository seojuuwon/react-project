import React from "react";

const Banner = ({movie}) => {
    // let popular = props.popular;
    console.log("넘어왓는가", movie);

    let url = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/" + movie.poster_path;
    let title = movie.original_title;
    let overview = movie.overview;

    return (
        <div className="banner">
            <div className="banner-item">
                <h1 className="banner-item-title">{title}</h1>
                <p className="banner-item-overview">{overview}</p>
            </div>
            <img src={url} className="banner-img"></img>

            {/* 
            <div className="benner-img" 
                style={{ backgroundImage : "url(" + `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.poster_path}` + ")"}}>
            </div> 
            */}
        </div>

        
    );
};

export default Banner;
