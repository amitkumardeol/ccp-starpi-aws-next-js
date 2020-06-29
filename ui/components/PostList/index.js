/* components/PostList/index.js */
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

const PostList = (
  { data: { loading, error, posts }, search },
  req
) => {
  if (error) return "Error loading Posts 1";
  //if Posts are returned from the GraphQL query, run the filter query
  //and set equal to variable PostSearch

  if (posts && posts.length) {
    //searchQuery
    const searchQuery = posts.filter(query =>
      query.postTitle.toLowerCase().includes(search)
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
                  src={`http://localhost:1337${res.postHeroImage.url}`}
                />
                <CardBody>
                  <CardTitle>{res.postTitle}</CardTitle>
                  <CardText>{res.postDescription}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/Posts/${res.id}`}
                    href={`/Posts?id=${res.id}`}
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
      return <h1>No Posts Found</h1>;
    }
  }
  return <h1>Loading 1</h1>;
};

const query = gql`
  {
    posts {
        id
        postTitle
        postDescription
        postHeroImage {
          url
        }
      }
  }
`;
PostList.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(PostList);