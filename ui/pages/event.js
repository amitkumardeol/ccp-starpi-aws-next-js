/* /pages/Event.js */

import gql from "graphql-tag";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withContext } from "../components/Context/AppProvider";
import {
  Button,
  Container,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row
} from "reactstrap";
import Cart from "../components/Cart/Cart";
import defaultPage from "../hocs/defaultPage";

class Event extends React.Component {
  constructor(props) {
    super(props);
  }

  addItem(item) {
    this.props.context.addItem(item);
  }
  render() {
    const {
      data: { loading, error, event },
      router,
      context,
      isAuthenticated
    } = this.props;
    if (error) return "Error Loading Challenges";

    if (event) {
      return (
        <>
          <h1>{event.eventTitle}</h1>
          <Container
          fluid="true">
          <Row>
                {event.challenges.map(res => (
                   
                    <Col xs="9" style={{ padding: 0 }}>
                    <div style={{ display: "block" }} className="h-33">
                    <Card
                    style={{ width: "30%", margin: "0 10px" }}
                    key={res.id}
                  >
                    <CardImg
                      top={true}
                      style={{ height: 250 }}
                      src={`http://localhost:1337${res.image.url}`}
                    />
                    <CardBody>
                      <CardTitle>{res.name}</CardTitle>
                      <CardText>{res.description}</CardText>
                    </CardBody>
                    <div className="card-footer">
                      <Button
                        onClick={this.addItem.bind(this, res)}
                        outline
                        color="primary"
                      >
                        + Enter the challenge
                      </Button>

                      <style jsx>
                        {`
                          a {
                            color: white;
                          }
                          a:link {
                            text-decoration: none;
                            color: white;
                          }
                          .container-fluid {
                            margin-bottom: 30px;
                          }
                          .btn-outline-primary {
                            color: #007bff !important;
                          }
                          a:hover {
                            color: white !important;
                          }
                        `}
                      </style>
                    </div>
                  </Card>
                  </div>
                    </Col>
                    
                
                ))}
                 <Col xs="3" style={{ padding: 0 }}>
                    <div>
                        <Cart isAuthenticated={isAuthenticated} />
                    </div>
                    </Col>
                    </Row>
                    </Container>
             
        </>
      );
    }
    return <h1>Loading</h1>;
  }
}

const GET_POST_CHALLENGES = gql`
  query($id: ID!) {
    event(id: $id) {
        id
        eventTitle
        eventSubTitle
        eventDetail
        eventSummary
        eventStartDate
        eventEndDate
        eventDifficulty
        eventLocation
        eventHeroImage {
          url
        }
        challenges {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
  }
`;
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (postList)

export default compose(
  withRouter,
  defaultPage,
  withContext,
  graphql(GET_POST_CHALLENGES, {
    options: props => {
      return {
        variables: {
          id: props.router.query.id
        }
      };
    },
    props: ({ data }) => ({ data })
  })
)(Event);