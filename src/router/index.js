import React from 'react';
import {Routes, Route} from 'react-router-dom';
import linkTo from "./linkTo";
import NotFoundPage from '../components/NotFoundPage';
import HomePage from "../pages/HomePage";
import PlanetDetailsPage from "../pages/PlanetDetailsPage";
import PlanetFilmsPage from "../pages/PlanetFilmsPage";
import PlanetResidentsPage from "../pages/PlanetResidentsPage";

const Router = () => {
    return (
        <Routes>
            <Route path={linkTo('Home')} element={<HomePage/>}/>
            <Route path={linkTo('PlanetDetails')} element={<PlanetDetailsPage/>}/>
            <Route path={linkTo('PlanetFilms')} element={<PlanetFilmsPage/>}/>
            <Route path={linkTo('PlanetResidents')} element={<PlanetResidentsPage/>}/>
            <Route element={NotFoundPage}/>
        </Routes>
    );
};

export default Router;
