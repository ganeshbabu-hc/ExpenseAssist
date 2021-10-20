import {useDispatch, useSelector} from 'react-redux';
import { COUNTER_CHANGE } from '../../redux/constants/StoreConstants';
const state = useSelector((state: any) => state.count);
const dispatch = useDispatch();
dispatch({type: COUNTER_CHANGE, payload: 10});