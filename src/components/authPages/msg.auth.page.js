import React, {useState} from 'react';
import { Alert } from "reactstrap";

function AlertMsg(props) {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
        //setVisible(false);
        props.dissmis();
    };

    if (props.message === "") {
        return null;
    }
    if (props.message === "User Created") {
        return (
            <div>
                <Alert color="success" isOpen={visible} toggle={onDismiss}>
                    User Created
            </Alert>
            </div>
        );
    }
    return (
        <div>
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                {props.message}
            </Alert>
        </div>
    );
}

export default AlertMsg;