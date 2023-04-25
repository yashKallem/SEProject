import initialState from './state';

// const initialState = {
//     name: null,
//     email: null,
// }


const reducer = (
    state=initialState,
    action
) => {
    switch (action.type) {

        case "ON_EMAIL":
            const email=action.payload
            return {
                ...state,
                email:email
            }

        case "ON_ALL_PROJECTS":
            const data=action.payload
            console.log("reducer",action,data)
        return{
                ...state,
                allProjects:data
            }

        default : 
            return state;
    }
}


export default reducer;
// 
// 
// import { createSlice } from '@reduxjs/toolkit'
// 
// const initialState = {
//   value: 0,
// }
// 
// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       // Redux Toolkit allows us to write "mutating" logic in reducers. It
//       // doesn't actually mutate the state because it uses the Immer library,
//       // which detects changes to a "draft state" and produces a brand new
//       // immutable state based off those changes
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload
//     },
//   },
// })
// 
// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions
// 
// export default counterSlice.reducer