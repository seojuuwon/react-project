import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    // name : 슬라이스 이름 정의
    name : 'movies',
    
    // initialState : 초기 상태
    // ==> let popularMovies = []
    initialState : {
        popularMovies : [],
        topRatedMovies : [],
        upComingMovies : []
    },

    // reducers : 액션을 처리하는 함수
    // ==> let getPopularMovies = () => {} 
    reducers : {
        // state : 초기 상태, action : 행위? 행동
        getPopularMovies : (state, action) => {
            state.popularMovies = action.payload; // payload : action 안에서 주고 받는 데이터, 보통 API 데이터가 들어감
        },
        getTopRatedMovies : (state, action) => {
            state.topRatedMovies = action.payload;
        },
        getUpComingMovies : (state, action) => {
            state.upComingMovies = action.payload;
        }
    }
});

export const { getPopularMovies, getTopRatedMovies, getUpComingMovies } = movieSlice.actions;
export default movieSlice.reducer;