import {PageParams} from "./PageParams";

const links: {[key in keyof PageParams]: (params: PageParams[key]) => string} = {
    Home: () => '/',
    PlanetDetails: ({planetId= ':planetId'}) => `/planet/${planetId}`,
    PlanetFilms: ({planetId= ':planetId'}) => `/planet/${planetId}/films`,
    PlanetResidents: ({planetId = ':planetId'}) => `/planet/${planetId}/residents`,
};

function linkTo<PageName extends keyof PageParams>(page: PageName, params?: PageParams[PageName]): string {
    return links[page](params || {} as PageParams[PageName]);
}

export default linkTo;
