import { Dispatch } from 'redux';
import mock from '../../mock/index';

import {
    GAME_START,
    GAME_RESET,
    ITEM_COLLECT,
} from "./constants";

export function gameStart() {
    return (dispatch: Dispatch) => {
        dispatch(GAME_RESET());
        return dispatch(GAME_START(mock));
    }
}

export function itemCollect(title: string) {
    return (dispatch: Dispatch) => {
        return dispatch(ITEM_COLLECT(title));
    }
}