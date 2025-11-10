import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from '../thunks/fetchUser';

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
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            //change loading to false
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchUsers.rejected, (state, action) =>{
            state.isLoading = false
            state.error = action.payload
        })
    }
});

export const usersReducer = usersSlice.reducer;