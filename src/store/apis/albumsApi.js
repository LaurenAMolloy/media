import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

//DEV ONLY
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        //remove for production
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            //mutation endpoint
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id }]
                },
                //request config
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.Id,
                            title: faker.commerce.productName(),
                        }
                    }

                }
            }),
            //This becomes a hook
            //query endpoint
            fetchAlbums: builder.query({
                //dynamic property
                providesTags: (result, error, user) => {
                    return [{ type: 'Album', id: user.id }]
                },
                //request config
                query: (user) => {
                    return {
                        //tell rtk how to make the request
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET'
                    };
                },
            })
        }
    },
});

//functions to export
export const { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation } = albumsApi;
export { albumsApi };