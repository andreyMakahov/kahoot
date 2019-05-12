import * as React from "react";
import * as styles from './index.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PlayGround from '../PlayGround';
import Statistics from '../Statistics';
import Footer from '../Footer';
import { gameStart } from '../../actions';

type AppProps = {
    gameStart(): void;
}

class App extends React.Component<AppProps, {}> {
    constructor(props: AppProps) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        const { gameStart } = this.props;
        gameStart();
    }

    render() {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.playGround}>Kahoot Points</div>
                    <div className={styles.statistics}>Player Items</div>
                </header>
                <div className={styles.body}>
                    <div className={styles.playGround}>
                        <PlayGround />
                    </div>
                    <div className={styles.statistics}>
                        <Statistics />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        ...bindActionCreators({
            gameStart
        }, dispatch)
    })
)(App);