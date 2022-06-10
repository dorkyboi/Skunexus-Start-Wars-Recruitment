import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Film} from "../../entities/film";
import extractId from "../../helpers/extractId";

export const filmsApi = createApi({
    reducerPath: 'films',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://swapi.dev/api/films/',
    }),
    endpoints: (build) => ({
        getFilm: build.query<Film, string>({
            query: (arg) => Number.isInteger(arg) ? arg : extractId(arg),
        }),
    }),
});

export const {useGetFilmQuery} = filmsApi;
