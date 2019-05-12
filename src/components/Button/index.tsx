import * as React from "react";

export interface ButtonProps {
    text: string;
    className: string;
    onClick (event: any): void,
}

class Button extends React.Component<ButtonProps, {}> {
    render() {
        const { text, className, onClick } = this.props;
        return (
            <div
                className={className}
                onClick={onClick}
            >{text}</div>
        );
    }
}

export default Button;
