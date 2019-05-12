import * as React from "react";
import { connect } from 'react-redux';
import {
    ItemsByHashInterface,
    StateInterface,
} from "../../interfaces";
import ScoreItem from "../ScoreItem";
import { bindActionCreators } from "redux";
import * as styles from './index.scss';
import {
    itemCollect,
} from "../../actions";

type StateProps = {
    list: string[];
    byId: ItemsByHashInterface,
}
type DispatchProps = {
    itemCollect(id: string): void;
}

type PlayGroundProps = StateProps & DispatchProps;

class PlayGround extends React.Component<PlayGroundProps, {}> {
    constructor(props: PlayGroundProps) {
        super(props);
        this.onCollect = this.onCollect.bind(this);
    }

    onCollect(title: string): void {
        const { itemCollect } = this.props;
        itemCollect(title);
    }

    renderList() {
        const { list, byId } = this.props;
        return list.map((title: string) => (
            <ScoreItem
                key={title}
                title={byId[title].title}
                onClick={() => this.onCollect(title)}
            />
        ));
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderList()}
            </div>
        );
    }
}

export default connect(
    (state: StateInterface) => ({
        list: state.itemList,
        byId: state.itemById,
    }),
    (dispatch) => ({
        ...bindActionCreators({
            itemCollect,
        }, dispatch)
    }),
)(PlayGround);
