/* components/EventList/index.js */
import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

const EventList = (
  { data: { loading, error, events }, search },
  req
) => {
  if (error) return "Error loading events";
  //if Events are returned from the GraphQL query, run the filter query
  //and set equal to variable EventSearch

  if (events && events.length) {
    //searchQuery
    const searchQuery = events.filter(query =>
      query.eventTitle.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="h-100">
            {searchQuery.map(res => (
              <Card
                style={{ width: "30%", margin: "0 10px" }}
                className="h-100"
                key={res.id}
              >
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`http://localhost:1337${res.eventHeroImage.url}`}
                />
                <CardBody>
                  <CardTitle>{res.eventTitle}</CardTitle>
                  <CardText>{res.eventSummary}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/Events/${res.id}`}
                    href={`/Events?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <h1>No Events Found</h1>;
    }
  }
  return <h1>Loading Events</h1>;
};

const query = gql`
  {
    events {
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
    }
  }
`;
EventList.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (EventList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(EventList);