import { useDispatch, useSelector } from 'react-redux';

/**
 * Typed Redux hooks (even if you don't use TS yet)
 */
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
