import { GoTrashcan } from "react-icons/go"
import { useRemoveAlbumsMutation } from "../store"
import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'

export default function AlbumsListItem({ album }) {
    const [ removeAlbum, results ] = useRemoveAlbumsMutation();

    const handleRemoveAlbum = () => {
        //provide the album and the user to the end point!
        removeAlbum({ album, user });
    };

    const header = (
       <>
        <Button loading={results.isLoading} onClick={handleRemoveAlbum}>
        <GoTrashcan />
        </Button>
        {album.title}
        </> 
    ) 
    return (
        <ExpandablePanel key={album.id} header={header}>
            List of Photo's in the Album
        </ExpandablePanel>
    )
}
