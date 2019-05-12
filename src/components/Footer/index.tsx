import * as React from "react";
import * as styles from './index.scss';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Summary from '../Summary';
import Button from '../Button';
import { gameStart } from '../../actions';

type FooterProps = {
    gameStart(): void;
}

class Footer extends React.Component<FooterProps, {}> {
    constructor(props: FooterProps) {
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
                <Summary />
                <Button
                    text={'NEW GAME'}
                    className={styles.button}
                    onClick={this.startNewGame}
                />
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
)(Footer);