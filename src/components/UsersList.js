import { useEffect } from "react";
import { useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store'
import Button from '../components/Button'
import Skeleton from "./Skeleton";
import { useThunk } from '../hooks/useThunk'
import UserListItem from '../components/UserListItem'


function UsersList() {
    //custom hook for fetch, loading state and loading errors
    const [doFetchUsers, isLoadingUsers, loadingUserError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError ] = useThunk(addUser)

    const { data } = useSelector((state) => {
        return state.users; 
    })

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    }
    
    let content;
    if(isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full"></Skeleton>
    } else if (loadingUserError) {
        content =  <div>Error fetching data</div>
    } else {
        content = data.map((user) => {
            return <UserListItem key={user.id} user={user} />
        })
    };

    return (
    <div>
        <div className="flex flex-row justify-between m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button loading={isCreatingUser} onClick={handleUserAdd}>Add User
            </Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        {content}
    </div>
    )
}

export default UsersList;