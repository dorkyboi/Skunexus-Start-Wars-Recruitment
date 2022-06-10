import React from "react";
import {useGetFilmQuery} from "../../store/apis/filmsApi";
import Loading from "../IconViews/Loading";
import Warn from "../IconViews/Warn";
import extractRtkQueryError from "../../helpers/extractRtkQueryError";

interface FilmCardProps {
    url: string,
}

function FilmCard({url}: FilmCardProps): JSX.Element {
    const {data, isLoading, error} = useGetFilmQuery(url);

    return (
        <div className="p-5 bg-white rounded border border-gray-200 shadow-md h-72 xl:h-96">
            {/* Loading */}
            {isLoading && <Loading/>}

            {/* Loading error */}
            {!isLoading && !data && !!error && (
                <Warn>
                    {extractRtkQueryError(error)}
                </Warn>
            )}

            {/* Loaded */}
            {!isLoading && !!data && (
                <>
                    <h5 className="mb-2 text-2xl font-bold text-gray-900">
                        {data.title}
                    </h5>
                    <div className={'flex flex-row justify-between mb-3'}>
                        <p className="mr-3 text-gray-700">
                            {data.director}
                        </p>
                        <p className="text-gray-700">
                            Episode: {data.episode_id}
                        </p>
                    </div>
                    <p className="mb-3 text-gray-700 line-clamp-1">
                        {data.producer}
                    </p>
                    <p className="mb-3 text-xl text-gray-700 line-clamp-4 xl:line-clamp-6">
                        {data.opening_crawl}
                    </p>
                </>
            )}
        </div>
    );
}

export default FilmCard;
