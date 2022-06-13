import React from "react";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {useParams} from "react-router-dom";
import {PageParams} from "../router/PageParams";
import extractId from "../helpers/extractId";
import {useGetFilmsQuery} from "../store/apis/filmsApi";
import {skipToken} from "@reduxjs/toolkit/query";
import Grid from "../components/Grid";
import {Film} from "../entities/film";
import Loading from "../components/IconViews/Loading";

const Headers: (keyof Film)[] = [
    'title',
    'producer',
    'director',
    'episode_id',
];

function PlanetFilmsPage() {
    const {planetId} = useParams<PageParams['PlanetFilms']>();
    const {planet, isLoading: loadingPlanet} = useGetPlanetsQuery(undefined, {
        selectFromResult: data => ({
            ...data,
            planet: data.currentData?.results.find(planet => extractId(planet) === planetId),
        }),
    });
    const {data: films, isLoading} = useGetFilmsQuery(planet ? planet.films : skipToken);

    if (isLoading || loadingPlanet)
        return <Loading/>;

    if (!planet || !films?.length)
        return null;

    return <Grid header={Headers} values={films}/>;
}

export default PlanetFilmsPage;
