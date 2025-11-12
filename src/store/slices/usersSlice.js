import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUser';
import { addUser } from '../thunks/addUser'
import { removeUser } from '../thunks/removeUser'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    //users will not make use of reducers
    //reducers: {},
    //Only extra reducers
    extraReducers(builder) {
        //listen for pending we do not need to write actions
        //action types are automatically created for us
        //listen for fetchUsers.pending
        //listen for fetchUsers.rejected
        //listen for fetchUsers.fulfilled
        builder.addCase(fetchUsers.pending, (state, action) => {
            //change loading to true
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            //change loading to false
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) =>{
            state.isLoading = false
            state.error = action.payload
        });
        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading  = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        });
        //deleting users
        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            //Remove manually 
            //which user?
            state.data =state.data.filter(user => {
                return user.id !== action.payload.id
            })

        })
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error
        });
    },
});

export const usersReducer = usersSlice.reducer;