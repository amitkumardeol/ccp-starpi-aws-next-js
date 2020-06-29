/* components/RestaurantList/index.js */
import gql from "graphql-tag";
import Link from "next/link";
import { graphql } from "react-apollo";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import {
  Button,
  Card,
  CardBody,
  CardColumns,
  CardImg,
  CardSubtitle
} from "reactstrap";
import { CardText, CardTitle, Col, Row } from "reactstrap";

const NavitemsList = (
  { data: { loading, error, navitems }, search },
  req
) => {
  if (error) return "Error loading navitems";
  //if Navitems are returned from the GraphQL query, run the filter query
  //and set equal to variable NavitemSearch

  if (navitems && navitems.length) {
    //searchQuery
    const searchQuery = navitems.filter(query =>
      query.name.toLowerCase().includes(search)
    );
    if (searchQuery.length != 0) {
      return (
        <div>
          <div className="h-100">
            {searchQuery.map(res => (
              <NavItem>
              <Link href="{res.linkTarget}">
                  <a className="navbar-brand">{res.Label}</a>
              </Link>
             </NavItem>
             
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
      return <h1>No navitems Found</h1>;
    }
  }
  return <h1>Loading 1</h1>;
};

const query = gql`
  {
    navitems {
        id
        navType
        UrlItems {
          id
          Label
          linkItemType
          itemAltText
          linkTarget 
         }
    }
  }
`;
RestaurantList.getInitialProps = async ({ req }) => {
  const res = await fetch("https://api.github.com/repos/zeit/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (RestaurantList)
export default graphql(query, {
  props: ({ data }) => ({
    data
  })
})(NavitemsList);