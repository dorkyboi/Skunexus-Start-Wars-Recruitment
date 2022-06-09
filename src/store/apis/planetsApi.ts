import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Planet} from "../../entities/planet";
import {PaginatedResult} from "../../types/PaginatedResult";

export const planetsApi = createApi({
    reducerPath: 'planet',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://swapi.dev/api/planets/',
    }),
    endpoints: (build) => ({
        getPlanets: build.query<PaginatedResult<Planet>, void>({
            query: () => '',
        }),
    }),
});

export const {useGetPlanetsQuery} = planetsApi;
