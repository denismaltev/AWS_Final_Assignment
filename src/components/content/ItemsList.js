import React, { Component } from "react";

const API_URL = "https://xijx2gs4ng.execute-api.us-east-1.amazonaws.com/prod";
export default class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loadingProducts: true,
      showList: true,
      swowDetails: false,
      productIdToShow: 0
    };

    this.getDetails = this.getDetails.bind(this);
    //this.renderProductsTable = this.renderProductsTable.bind(this);

    fetch(API_URL + "/products")
      .then(response => response.json())
      .then(data => {
        this.setState({
          products: JSON.parse(data.body),
          loadingProducts: false
        });
      });
  }

  getDetails(event) {
    event.preventDefault();
    this.setState({
      showList: false,
      swowDetails: true
    });
    //alert("productId");
  }

  renderProductsTable(products) {
    if (products.errorMessage) {
      return (
        <div className="errorMessage">
          <p>No data recived: Check your DB</p>
          {products.errorMessage}
        </div>
      );
    } else {
      return (
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.productId + product.Name}>
                <td>{product.Name}</td>
                <td>{product.Price}</td>
                <td>
                  <button onClick={this.getDetails}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  render() {
    if (this.state.showList == true) {
      let content = this.state.loadingProducts ? (
        <p>...Loading</p>
      ) : (
        this.renderProductsTable(this.state.products)
      );
      return (
        <div>
          <h1>List of products</h1>
          {content}
        </div>
      );
    } else return "";
  }
}
