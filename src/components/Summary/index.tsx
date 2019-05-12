import * as React from "react";
import { connect } from 'react-redux';
import {
    StateInterface,
} from "../../interfaces";
import {
    GAME_STATUS_IDLE,
} from '../../constants';
import * as styles from './index.scss';

type SummaryProps = {
    bonusScore: number,
    totalScore: number,
    status: string,
}

class Summary extends React.Component<SummaryProps, {}> {

    render() {
        const status: string = this.props.status;
        const bonusScore: number = this.props.bonusScore;
        const totalScore: number = this.props.totalScore;

        if (status === GAME_STATUS_IDLE) return null;

        return (
            <div className={styles.container}>
                <div className={styles.statistics}>
                    <div className={styles.label}>Bonuses:</div>
                    <div className={styles.score}>{bonusScore}</div>
                </div>
                <div className={styles.statistics}>
                    <div className={styles.label}>Total:</div>
                    <div className={styles.score}>{totalScore}</div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        bonusScore: state.bonusScore,
        totalScore: state.totalScore,
        status: state.status,
    }),
    null,
)(Summary);
