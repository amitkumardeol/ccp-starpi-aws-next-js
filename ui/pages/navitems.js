import gql from "graphql-tag";
import Link from "next/link";
import { Container, Nav, NavItem } from "reactstrap";
import { graphql } from "react-apollo";
import { compose } from "recompose";



class navitems extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {data: { loading, error, navitem }} = this.props;
    if (error) return "Error Loading navItems";
    if (navitem) {
      return (
            <Nav className="navbar navbar-dark bg-dark">
        {navitem.UrlItems.map(res => (
                  <NavItem>
					<Link href={res.linkTarget}>
						<a className="navbar-brand">{res.Label}</a>
					</Link>
                   </NavItem>

            ))}
            </Nav>
      );
    }
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
// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (navitemList)

export default compose(
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
)(navitems);