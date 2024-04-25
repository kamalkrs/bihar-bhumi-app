import { createSlice } from "@reduxjs/toolkit";
import { IUserType } from "../utils/types";

const initialState: IUserType = {
    id: 0, first_name: '', last_name: ''
}

const userSlices = createSlice({
    name: 'user',
    initialState: { login: initialState },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload
        }
    }
})

export const { setLogin } = userSlices.actions
export default userSlices.reducer