import { GoTrashcan } from "react-icons/go"
import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button'

export default function AlbumsListItem({ album }) {
    const header = <div>
        <Button>
        <GoTrashcan />
        </Button>
        {album.title}
        </div>
    return (
        <ExpandablePanel key={album.id} header={header}>
            List of Photo's in the Album
        </ExpandablePanel>
    )
}
