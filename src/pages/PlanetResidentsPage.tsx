import React from "react";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {useParams} from "react-router-dom";
import {PageParams} from "../router/PageParams";
import extractId from "../helpers/extractId";
import Grid from "../components/Grid";
import {useGetResidentsQuery} from "../store/apis/residentsApi";
import {skipToken} from "@reduxjs/toolkit/query";
import Loading from "../components/IconViews/Loading";
import {Resident} from "../entities/residents";

const Headers: (keyof Resident)[] = [
    'name',
    'birth_year',
    'height',
    'mass',
    'homeworld',
];

function PlanetResidentsPage() {
    const {planetId} = useParams<PageParams['PlanetResidents']>();
    const {planet, isLoading: loadingPlanet} = useGetPlanetsQuery(undefined, {
        selectFromResult: data => ({
            ...data,
            planet: data.currentData?.results.find(planet => extractId(planet) === planetId),
        }),
    });
    const {data: residents, isLoading} = useGetResidentsQuery(planet ? planet.residents : skipToken);

    if (isLoading || loadingPlanet)
        return <Loading/>;

    if (!planet || !residents?.length)
        return null;

    return <Grid header={Headers} values={residents}/>;
}

export default PlanetResidentsPage;
