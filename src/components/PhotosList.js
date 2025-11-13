import React from 'react'
import { useFetchPhotosQuery, useAddPhotoMutation } from '../store'
import Button from '../components/Button'
import Skeleton from './Skeleton';
import PhotosListItem from './PhotosListItem';

export default function PhotosList({ album }) {
    //destructure properties from useFetchQuery
    const {data, isFetching, error} = useFetchPhotosQuery(album);

    //destructure properties from mutation hook
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
    };

    let content;
    //Update the content based on...
    if(isFetching) {
        content = <Skeleton className="h-8 w-8" times={4} />
    } else if (error) {
        content = <div>Error Fetching Photos</div>
    } else {
        content = data.map((photo) => {
            return <PhotosListItem key={photo.id} photo={photo} />
        });
    }

    return <div>
        <div className="m-2 flex flex-rwo items-center justify between">
           <h3 className="text-lg font-bold">Photos In {album.title}</h3>
           <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
            + Add Photo
           </Button>
        </div>
        <div className="mx-8 flex flex-row flex-wrap justify-center">{content}</div>
    </div>

}
