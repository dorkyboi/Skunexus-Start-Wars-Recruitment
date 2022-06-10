import {configureStore} from "@reduxjs/toolkit";
import {planetsApi} from "./apis/planetsApi";
import {filmsApi} from "./apis/filmsApi";

const store = configureStore({
    reducer: {
        [planetsApi.reducerPath]: planetsApi.reducer,
        [filmsApi.reducerPath]: filmsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        planetsApi.middleware,
        filmsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
