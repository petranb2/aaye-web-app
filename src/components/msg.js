import React, { useState } from "react";
import { Alert } from "reactstrap";

const Message = (props) => {

  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    //setVisible(false);
    props.dissmis();
  };

  if (props.message === "") {
    return null;
  }
  return (
    <div>
      <Alert color="danger" isOpen={visible} toggle={onDismiss}>
        Credentials missmatch
    </Alert>
    </div>
  );
};

export default Message;
