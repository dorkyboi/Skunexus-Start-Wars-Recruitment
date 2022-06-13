import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Film} from "../../entities/film";
import extractId from "../../helpers/extractId";

export const filmsApi = createApi({
    reducerPath: 'films',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://swapi.dev/api/films/',
    }),
    endpoints: (build) => ({
        getFilms: build.query<Film[], string[]>({
            queryFn: async (urls, _queryApi, _extraOptions, fetchWithBQ) => ({
                data: await Promise.all(urls.map(url => {
                    const maybePromise = fetchWithBQ(extractId(url));
                    if ('then' in maybePromise)
                        return maybePromise.then(response => response.data);
                    return maybePromise;
                })) as Film[]
            }),
        }),
    }),
});

export const {useGetFilmsQuery} = filmsApi;
