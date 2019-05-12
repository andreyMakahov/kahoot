import {
    GAME_RESET_TYPE,
    GAME_START_TYPE,
    ITEM_COLLECT_TYPE,
} from "../actions/constants";
import {
    ItemsByHashInterface,
    ActionInterface,
    ScoreItemInterface,
    StateInterface,
    StatisticsItemInterface,
    StatisticsByIdItemInterface, ScoreItemBonusInterface,
} from "../interfaces";
import {
    GAME_STATUS_IDLE,
    GAME_STATUS_RUNNING,
} from '../constants';

import isUndefined from '../utils/isUndefined';

const initialState: StateInterface = {
    itemById: {},

    itemList: [],

    bonusScore: 0,

    totalScore: 0,

    statistics: {
        list: [],
        byId: {},
    },

    status: GAME_STATUS_IDLE,
};

export default function game(state: StateInterface = initialState, action: ActionInterface) {
    switch(action.type) {
        case GAME_START_TYPE:
            return gameStart(state, action);
        case GAME_RESET_TYPE:
            return initialState;
        case ITEM_COLLECT_TYPE:
            return itemCollect(state, action);
        default:
            return initialState;
    }
}

function gameStart(state: StateInterface, action: ActionInterface): StateInterface {
    const { payload } = action;

    const itemById: ItemsByHashInterface = {};
    const itemList: string[] = [];

    payload.scoreItemList.forEach((item: ScoreItemInterface) => {
        itemList.push(item.title);
        itemById[item.title] = item;
    });

    return {
        ...state,
        itemById,
        itemList,
        status: GAME_STATUS_RUNNING,
    };
}

function itemCollect(state: StateInterface, action: ActionInterface): StateInterface {
    const { payload } = action;

    const title: string = payload.title;

    let { list, byId } = state.statistics;
    const scoreItem: ScoreItemInterface = state.itemById[title];
    const statisticsItem: StatisticsItemInterface = byId[title];
    const itemExists: boolean = !isUndefined(statisticsItem);
    let statisticsById: StatisticsByIdItemInterface = {};

    if (!itemExists) {
        list = list.concat(title);
        statisticsById[title]= {
            quantity: 1,
            score: scoreItem.score,
            bonusScore: 0,
            nonBonusScore: scoreItem.score,
        }
    } else {
        let quantity: number = byId[title].quantity + 1;
        const bonus: ScoreItemBonusInterface = scoreItem.bonus;
        let score: number = 0;
        let bonusScore: number = 0;
        let nonBonusScore: number = 0;
        if (isUndefined(bonus)) {
            score = quantity * scoreItem.score;
        } else {
            let bonusSetCount: number = Math.floor(quantity / bonus.count);
            bonusScore = (bonusSetCount * bonus.score) - (bonusSetCount * bonus.count * scoreItem.score);
            nonBonusScore = quantity * scoreItem.score;
            score = bonusScore + nonBonusScore;
        }

        statisticsById[title] = {
            quantity,
            score,
            bonusScore,
            nonBonusScore,
        }
    }

    const newById = {
        ...byId,
        ...statisticsById,
    };

    let bonusScore: number = 0;
    let totalScore: number = 0;

    list.forEach((title: string) => {
        totalScore += newById[title].score;
        bonusScore += newById[title].bonusScore;
    });

    return {
        ...state,
        totalScore,
        bonusScore,
        statistics: {
            ...state.statistics,
            list,
            byId: newById,
        }
    };
}