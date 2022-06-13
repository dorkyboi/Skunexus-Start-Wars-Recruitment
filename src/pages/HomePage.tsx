import React from "react";
import Grid from "../components/Grid";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {Planet} from "../entities/planet";
import {useNavigate, useSearchParams} from "react-router-dom";
import linkTo from "../router/linkTo";
import extractId from "../helpers/extractId";
import PlanetEditModal from "../components/PlanetEditModal";

const Headers: (keyof Planet)[] = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
];

function HomePage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const {data, planet} = useGetPlanetsQuery(undefined, {
        selectFromResult: data => ({
            ...data,
            planet: data.currentData?.results.find(planet => extractId(planet) === searchParams.get('edit')),
        }),
    });

    const closeModal = () => setSearchParams({});

    return (
        <>
            <h1 className={"text-center"}>Star Wars Planets</h1>
            <Grid
                header={Headers}
                values={data?.results || []}
                actions={[
                    {
                        label: 'Details',
                        action: planet => navigate(linkTo('PlanetDetails', {planetId: extractId(planet)})),
                    },
                    {
                        label: 'Edit',
                        action: planet => setSearchParams({edit: extractId(planet)}),
                    },
                    {
                        label: 'Films',
                        action: planet => navigate(linkTo('PlanetFilms', {planetId: extractId(planet)})),
                        visible: planet => !!planet.films.length,
                    },
                    {
                        label: 'Residents',
                        action: planet => navigate(linkTo('PlanetResidents', {planetId: extractId(planet)})),
                        visible: planet => !!planet.residents.length,
                    },
                ]}
            />

            <PlanetEditModal
                planet={planet}
                toggle={closeModal}
            />
        </>
    );
}

export default HomePage;
