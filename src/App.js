import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";

// --------------------------------------------------------
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";

function App() {
    return (
        <div>
            <Header />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path="/movies/:id" element={<MovieDetail />}></Route>
              <Route path="/movieList" element={<Movies />}></Route>
            </Routes>
        </div>
    );
}

export default App;
