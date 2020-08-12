import React, { Component } from "react";

import "./App.css";

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
    Promise.all(
      [1, 2, 3].map((i) =>
        fetch(`/api/branch${i}.json`).then((res) => res.json())
      )
    )
      .then((result) => {
        // grab all products
        let prods = [
          ...result[0].products,
          ...result[1].products,
          ...result[2].products,
        ];
        //sort products alphabetically
        prods = prods.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({
          isFetching: false,
          loadedProducts: prods,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { loadedProducts } = this.state;

    let filteredProducts = [...loadedProducts];

    let total = filteredProducts.reduce(function (a, b) {
      return a + b.unitPrice * b.sold;
    }, 0);

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
              <tr key={product.name + product.id}>
                <td>{product.name}</td>{" "}
                <td>£ {formatNumber(product.unitPrice * product.sold)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>£ {formatNumber(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
