import React from "react";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {useParams} from "react-router-dom";
import {PageParams} from "../router/PageParams";
import extractId from "../helpers/extractId";
import FilmCard from "../components/cards/FilmCard";

function PlanetFilmsPage() {
    const {id} = useParams<PageParams['PlanetFilms']>();
    const {planet, isLoading} = useGetPlanetsQuery(undefined, {
        selectFromResult: data => ({
            ...data,
            planet: data.currentData?.results.find(planet => extractId(planet) === id),
        }),
    });

    if (isLoading)
        return 'Loading';

    if (!planet)
        return 404;

    return (
        <div className={'p-5 grid md:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5'}>
            {planet.films.map(url => <FilmCard key={url} url={url}/>)}
        </div>
    );
}

export default PlanetFilmsPage;
