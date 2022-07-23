import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import user from 'reducers/user'
import plans from 'reducers/plans'

export interface IAction{
  type:string;
  [key:string]:any
}

export const store = configureStore({
  reducer: {
    user,
    plans
  },
  devTools:true
})


const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const wrapper = createWrapper<AppStore>(makeStore)

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = useAppDispatch
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector
