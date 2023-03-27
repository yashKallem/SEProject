import projectR from './reducer'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import initialState from './state'

const store = configureStore({
    reducer: {
        project: projectR
    },
    devTools: process.env.NODE_ENV !== 'production'

})

export default store;