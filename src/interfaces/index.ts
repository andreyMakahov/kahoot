export interface StatisticsInterface {
    list: string[];

    byId: StatisticsByIdItemInterface;
}

export interface StatisticsByIdItemInterface {
    [id: string]: StatisticsItemInterface;
}

export interface StatisticsItemInterface {
    quantity: number;
    score: number;
    bonusScore: number;
    nonBonusScore: number;
}

export interface ItemsByHashInterface {
    [id: string]: ScoreItemInterface;
}

export interface ScoreItemBonusInterface {
    score: number;
    count: number;
}

export interface ScoreItemInterface {
    title: string;
    score: number;
    bonus: ScoreItemBonusInterface;
}

export interface ActionInterface {
    type: string;
    payload?: any;
}

export interface StateInterface {
    itemById: ItemsByHashInterface;

    itemList: string[];

    bonusScore: number;

    totalScore: number;

    statistics: StatisticsInterface;

    status: string;
}