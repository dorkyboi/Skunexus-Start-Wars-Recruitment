import {PageParams} from "./PageParams";

const links: {[key in keyof PageParams]: (params: PageParams[key]) => string} = {
    Home: () => '/',
    PlanetFilms: ({id= ':id'}) => `/planet/${id}/films`,
};

function linkTo<PageName extends keyof PageParams>(page: PageName, params?: PageParams[PageName]): string {
    return links[page](params || {} as PageParams[PageName]);
}

export default linkTo;
