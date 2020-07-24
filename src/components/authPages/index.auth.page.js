import React from "react";
import { Jumbotron, Button, Container } from "reactstrap";

const IndexPage = (props) => {

  const textBg = {
    'background-color': 'rgba(0,0,0, 0.4)', /* Black w/opacity/see-through */
    'font-weight': 'bold',
    'border': '3px solid #f1f1f1',
    'position': 'absolute',
    'top': '50%',
    'left': '50%',
    'transform': 'translate(-50%, -50%)',
    'width': '80%',
    'padding': '50px',
    'text-align': 'center'
  }

  return (
    <Container style={textBg}>
      <Jumbotron >
        <h1 className="display-3" >Home Auth Page</h1>
        <p className="lead">
          This app has login system with sessions, and secure pages.
        </p>
        <hr className="my-2" />
        <p>Built with React-Strap and React-Router</p>
      </Jumbotron>
    </Container>
  );
};

export default IndexPage;
