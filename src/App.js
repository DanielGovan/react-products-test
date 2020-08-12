import React, { Component } from "react";

import "./App.css";

const branchPath = "http://localhost:3000/api/branch2.json";

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

class App extends Component {
  state = {
    isFetching: true,
    products: [],
    searchKey: "",
  };

  componentDidMount() {
    fetch(branchPath)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isFetching: false,
          products: result.products,
        });
      });
  }

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div className="product-list">
        <label>Search Products</label>
        <input type="text" />

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {this.state.isFetching && (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  Fetching users...
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>{" "}
                <td>{formatNumber(product.unitPrice * product.sold)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
