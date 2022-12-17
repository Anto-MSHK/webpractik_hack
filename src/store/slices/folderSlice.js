import { createSlice} from '@reduxjs/toolkit';


const folderSclice = createSlice({
    name: 'folder',
    initialState: {
        folderId: ''
    },
    reducers: {
        setFolderId(state, action){
            state.folderId = action.payload
        }
    }
})


export const {setFolderId} = folderSclice.actions
export default folderSclice.reducer