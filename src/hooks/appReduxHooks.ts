import { store } from '../App'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../redux/reducers'

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
