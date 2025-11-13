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
            //mutation endpoints
            removeAlbums: builder.mutation({
                //Do we need to add an user?
                //NO We jsut need the albums id
                invalidatesTags: (results, error, album) => {
                    console.log(album);
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE'
                    };
                }
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }]
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
                    //map over the result
                    const tags = result.map(album => {
                        //This represents single album
                        return { type: 'Album', id: album.id}
                    });
                    //This represents list of albums
                    tags.push({ type: 'UsersAlbums', id: user.id});
                    return tags;
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
    useAddAlbumMutation,
useRemoveAlbumsMutation } = albumsApi;
export { albumsApi };