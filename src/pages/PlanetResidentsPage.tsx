import React from "react";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {useParams} from "react-router-dom";
import {PageParams} from "../router/PageParams";
import extractId from "../helpers/extractId";
import Grid, {GridData} from "../components/Grid";
import {useGetResidentsQuery} from "../store/apis/residentsApi";
import {skipToken} from "@reduxjs/toolkit/query";
import Warn from "../components/IconViews/Warn";
import Loading from "../components/IconViews/Loading";
import {Resident} from "../entities/residents";

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
        return <Warn>404</Warn>;

    const data: GridData<Resident> = {
        header: [
            'name',
            'birth_year',
            'height',
            'mass',
            'homeworld',
        ],
        values: residents,
        actions: [],
    };

    return (
        <Grid data={data}/>
    );
}

export default PlanetResidentsPage;
