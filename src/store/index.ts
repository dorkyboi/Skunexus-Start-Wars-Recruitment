import {configureStore} from "@reduxjs/toolkit";
import {planetsApi} from "./apis/planetsApi";

const store = configureStore({
    reducer: {
        [planetsApi.reducerPath]: planetsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
        planetsApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
