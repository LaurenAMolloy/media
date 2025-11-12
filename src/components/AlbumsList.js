
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store'
import Skeleton from './Skeleton'
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';

function AlbumsList ({ user }) {
    const { data, error, isLoading } =  useFetchAlbumsQuery(user);
    const [ addAlbum, results ]  = useAddAlbumMutation();

    const handleAddAlbum = () => {
        //trigger network request
        addAlbum(user);
    }
    
    let content;
    if (isLoading) {
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error){
        content = <div>Error Loading Albums</div>
    } else {
        content = data.map(album => {
           return <AlbumsListItem key={album.id} album={album}></AlbumsListItem>
        });
    }

    return (
        <div>
            <div>Albums for {user.name} </div>
            <Button loading={results.isLoading}  onClick={handleAddAlbum}>
                + Album
            </Button>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;