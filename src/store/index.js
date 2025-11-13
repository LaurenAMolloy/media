import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from "./apis/albumsApi";


export const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(albumsApi.middleware);
    }
});

//TEMP
//window.store = store;


setupListeners(store.dispatch)

export * from './thunks/fetchUser';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumsMutation } from './apis/albumsApi'