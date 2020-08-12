import React, { Component } from "react";

import "./App.css";

const branchPath = "http://localhost:3000/api/branch3.json";

const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

class App extends Component {
  state = {
    isFetching: true,
    loadedProducts: [],
    filterKey: "",
    filteredproducts: [],
  };

  componentDidMount() {
    fetch(branchPath)
      .then((res) => res.json())
      .then((result) => {
        // grab products
        let prods = result.products;
        //sort products alphabetically
        prods = prods.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // console.log("equal name!");
          return 0;
        });
        this.setState({
          isFetching: false,
          loadedProducts: prods,
        });
      });
  }

  render() {
    const { loadedProducts } = this.state;
    let filteredProducts = loadedProducts;
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
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>{" "}
                <td>£ {formatNumber(product.unitPrice * product.sold)}</td>
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
