import {TypedUseSelectorHook, useSelector as useLibSelector} from 'react-redux';
import type {RootState} from '../store';

const useSelector: TypedUseSelectorHook<RootState> = useLibSelector;

export default useSelector;
