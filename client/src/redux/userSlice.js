import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:'',
    notes:[]
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser(state,action){
            state.user = action.payload
        },
        setNotesToStore(state,action){
            state.notes = action.payload
        }
    }
})

export const {setUser,setNotesToStore} = userSlice.actions
export default userSlice.reducer;