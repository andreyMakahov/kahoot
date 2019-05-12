import {ActionInterface} from "../interfaces";

export const GAME_START_TYPE: string = 'GAME_START';
export const GAME_RESET_TYPE: string = 'GAME_RESET';

export const ITEM_COLLECT_TYPE: string = 'ITEM_COLLECT';

export const GAME_START = (data: object): ActionInterface => ({
    type: GAME_START_TYPE,
    payload: {
        scoreItemList: data,
    },
});

export const GAME_RESET = (): ActionInterface => ({
    type: GAME_RESET_TYPE,
});

export const ITEM_COLLECT = (title: string): ActionInterface => ({
    type: ITEM_COLLECT_TYPE,
    payload: {
        title,
    }
});