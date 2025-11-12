import { FaTrash } from "react-icons/fa";
import Button from './Button'
import { removeUser } from '../store'
import { useThunk } from '../hooks/useThunk';
import ExpandablePanel from './ExpandablePanel'
import AlbumsList from "./AlbumsList";

function UserListItem({ user }) {
    const [ doRemoveUser, isLoading, error] = useThunk(removeUser)

    const handleClick = () => {
        //run the thunk!
        //pass in user to delete
        //console.log("Deleting user:", user);
        doRemoveUser(user);
    }
    
    //Fragment, no html element is created
    const header = <>
    <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                        <FaTrash />
                        </Button>
                        {error && <div>Error deleting user</div>}
                        {user.name}
    </>
    return (
       <ExpandablePanel header={header}>
            CONTENT!
            <AlbumsList user={user} />
       </ExpandablePanel>
                        
                    
    )
}

export default UserListItem