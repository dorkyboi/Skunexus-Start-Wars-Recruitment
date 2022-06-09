import {useDispatch as useLibDispatch} from 'react-redux';
import type {AppDispatch} from '../store';

function useDispatch() {
    return useLibDispatch<AppDispatch>();
}

export default useDispatch;
