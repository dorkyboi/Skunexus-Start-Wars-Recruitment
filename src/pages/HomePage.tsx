import React from "react";
import Grid, {GridData} from "../components/Grid";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {Planet} from "../entities/planet";
import {useNavigate} from "react-router-dom";
import linkTo from "../router/linkTo";
import extractId from "../helpers/extractId";

function HomePage() {
    const navigate = useNavigate();
    const {data} = useGetPlanetsQuery();

    const gridData: GridData<Planet> = {
        header: [
            'name',
            'rotation_period',
            'orbital_period',
            'diameter',
            'climate',
            'gravity',
            'terrain',
            'surface_water',
            'population',
        ],
        values: data?.results || [],
        actions: [
            {
                label: 'Details',
                action: planet => navigate(linkTo('PlanetDetails', {planetId: extractId(planet)})),
                visible: planet => !!planet.films.length,
            },
            {
                label: 'Films',
                action: planet => navigate(linkTo('PlanetFilms', {planetId: extractId(planet)})),
                visible: planet => !!planet.films.length,
            },
            {
                label: 'Residents',
                action: (planet) => navigate(linkTo('PlanetResidents', {planetId: extractId(planet)})),
                visible: planet => !!planet.residents.length,
            },
        ],
    };

    return (
        <>
            <h1 className={"text-center"}>Star Wars Planets</h1>
            <Grid data={gridData}/>
        </>
    );
}

export default HomePage;
