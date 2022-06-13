import React from "react";
import {useGetPlanetsQuery} from "../store/apis/planetsApi";
import {useParams} from "react-router-dom";
import {PageParams} from "../router/PageParams";
import Loading from "../components/IconViews/Loading";
import {Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from "reactstrap";
import {Planet} from "../entities/planet";
import extractId from "../helpers/extractId";

function PlanetDetailsPage() {
    const {planetId} = useParams<PageParams['PlanetDetails']>();
    const {planet, isLoading} = useGetPlanetsQuery(undefined, {
        selectFromResult: data => ({
            ...data,
            planet: data.currentData?.results.find(planet => extractId(planet) === planetId),
        }),
    });

    if (isLoading)
        return <Loading/>;

    if (!planet)
        return null;

    return (
        <Container>
            <h1 className={"text-center"}>
                Planet Details - {planet.name}
            </h1>
            <ListGroup>
                {Object.keys(planet).map(key => {
                    const value = planet[key as keyof Planet];
                    return (
                        <ListGroupItem key={key}>
                            <ListGroupItemHeading>
                                {key}
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                                {Array.isArray(value) && value.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item}
                                        <br/>
                                    </React.Fragment>
                                ))}
                                {!Array.isArray(value) && value}
                            </ListGroupItemText>
                        </ListGroupItem>
                    );
                })}
            </ListGroup>
        </Container>
    );
}

export default PlanetDetailsPage;
