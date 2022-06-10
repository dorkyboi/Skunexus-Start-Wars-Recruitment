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
                label: 'Go to Films',
                action: (row) => {
                    navigate(linkTo('PlanetFilms', {id: extractId(row)}));
                },
            },
            {
                label: 'Go to Residents',
                action: (row) => {
                    console.log(`redirect to grid with ${row.residents.length} Residents`);
                },
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
