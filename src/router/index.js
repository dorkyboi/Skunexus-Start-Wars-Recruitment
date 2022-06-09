import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import HomePage from "../pages/HomePage";
import PlanetFilmsPage from "../pages/PlanetFilmsPage";
import linkTo from "./linkTo";

const Router = () => {
    return (
        <Routes>
            <Route path={linkTo('Home')} element={<HomePage/>}/>
            <Route path={linkTo('PlanetFilms')} element={<PlanetFilmsPage/>}/>
            <Route element={NotFoundPage}/>
        </Routes>
    );
};

export default Router;
