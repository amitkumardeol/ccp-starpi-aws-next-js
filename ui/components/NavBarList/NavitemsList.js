import gql from "graphql-tag";
import Link from "next/link";
import { Container, Nav, NavItem, Button } from "reactstrap";
import { withRouter } from "next/router";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import { withContext } from "../Context/AppProvider";

function NavitemsList({data:{ loading, error, navitem}}){
    if(loading){
    return <div>Loading</div>;
    }  else  if (navitem) {
        return (
          <>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
  <div class="container">
    <a class="navbar-brand" href="/">
          <img src="http://placehold.it/150x50?text=Logo" alt="Challenge Child Poverty"/>
        </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
           {navitem.UrlItems.map(res => (
             <li class="nav-item">
             <a class="nav-link" href="{res.linkTarget}">{res.Label}</a>
           </li>   
              ))}
                  </ul>
                  <a href="/checkout" class="btn btn-outline-primary" href="#">Donate</a>
    </div>
  </div>
             </nav>
            
              
          </>
        );
      }
    }

    const GET_Navitem_UrlItems = gql`
  query($id: ID!) {
    navitem(id: $id){
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

export default compose(
    withRouter,
    withContext,
    graphql(GET_Navitem_UrlItems, {
      options: props => {
        return {
          variables: {
            id: 1
          }
        };
      },
      props: ({ data }) => ({ data })
    })
  )(NavitemsList);