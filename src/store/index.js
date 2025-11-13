import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';
import { photosApi } from './apis/photosApi';


export const store = configureStore({
    reducer: {
        //Connect reducers
        users: usersReducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
    },
    //Connect middleware
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
        .concat(albumsApi.middleware)
        .concat(photosApi.middleware);
    }
});

//TEMP
//window.store = store;


setupListeners(store.dispatch)

export * from './thunks/fetchUser';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumsMutation } from './apis/albumsApi'
export {
    useFetchPhotosQuery,
    useAddPhotoMutation, 
    useRemovePhotoMutation,
} from './apis/photosApi'