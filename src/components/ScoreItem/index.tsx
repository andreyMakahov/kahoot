import * as React from "react";
import * as styles from './index.scss';

type ScoreItemProps = {
    title: string;
    onClick?(): void;
}

class ScoreItem extends React.Component<ScoreItemProps, {}> {
    render() {
        const { title, onClick } = this.props;
        return (
            <div className={styles.container} onClick={onClick}>{title}</div>
        );
    }
}

export default ScoreItem;
