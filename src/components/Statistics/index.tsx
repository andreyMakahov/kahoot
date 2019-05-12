import * as React from "react";
import { connect } from 'react-redux';
import {
    StatisticsInterface,
    StateInterface,
} from "../../interfaces";
import {
    GAME_STATUS_IDLE,
} from '../../constants';
import * as styles from './index.scss';

type StatisticsProps = {
    status: string,
    bonusScore: number,
    totalScore: number,
    statistics: StatisticsInterface,
}

class Statistics extends React.Component<StatisticsProps, {}> {
    renderList() {
        const statistics: StatisticsInterface = this.props.statistics;
        const list: string[] = statistics.list;

        return list.map((title) => this.renderStatisticsItem(title));
    }

    renderStatisticsItem(title: string) {
        const statistics: StatisticsInterface = this.props.statistics;
        return (
            <div className={styles.row} key={title}>
                <div className={styles.cell}>{title}</div>
                <div className={styles.cell}>
                    {statistics.byId[title].quantity}
                </div>
                <div className={styles.cell}>
                    {statistics.byId[title].score}
                </div>
            </div>
        );
    }

    render() {
        const status = this.props.status;
        const totalScore: number = this.props.totalScore;

        if (status === GAME_STATUS_IDLE || totalScore === 0) return null;

        return (
            <div className={styles.container}>
                <div className={`${styles.row} ${styles.header}`}>
                    <div className={styles.cell}>Item</div>
                    <div className={styles.cell}>Quantity</div>
                    <div className={styles.cell}>Score</div>
                </div>
                <div>
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        status: state.status,
        bonusScore: state.bonusScore,
        totalScore: state.totalScore,
        statistics: state.statistics,
    }),
    null,
)(Statistics);
