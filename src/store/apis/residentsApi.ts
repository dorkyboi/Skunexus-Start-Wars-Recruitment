import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import extractId from "../../helpers/extractId";
import {Resident} from "../../entities/residents";

export const residentsApi = createApi({
    reducerPath: 'residents',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://swapi.dev/api/people/',
    }),
    endpoints: (build) => ({
        getResidents: build.query<Resident[], string[]>({
            queryFn: async (urls, _queryApi, _extraOptions, fetchWithBQ) => ({
                data: await Promise.all(urls.map(url => {
                    const maybePromise = fetchWithBQ(extractId(url));
                    if ('then' in maybePromise)
                        return maybePromise.then(response => response.data);
                    return maybePromise;
                })) as Resident[]
            }),
        }),
    }),
});

export const {useGetResidentsQuery} = residentsApi;
