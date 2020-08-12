import React, { Component } from "react";

import "./App.css";
import ProductItem from "./components/ProductItem";
import { productAggregator } from "./productAggregator";

export const formatNumber = (number) =>
  new Intl.NumberFormat("en", { minimumFractionDigits: 2 }).format(number);

class App extends Component {
  state = {
    isFetching: true,
    loadedProducts: [],
    filterKey: "",
  };

  componentDidMount() {
    const sortProducts = (products) =>
      products.sort((a, b) => a.name.localeCompare(b.name));

    productAggregator().then((sumProds) =>
      this.setState({
        isFetching: false,
        loadedProducts: sortProducts(sumProds),
      })
    );
  }

  render() {
    const handleFilterChange = ({ target }) => {
      this.setState({
        filterKey: target.value,
      });
    };

    const { loadedProducts, filterKey } = this.state;

    let filteredProducts =
      filterKey && filterKey.length > 0
        ? loadedProducts.filter(({ name }) =>
            name.toUpperCase().includes(filterKey.toUpperCase())
          )
        : loadedProducts;

    let total = filteredProducts.reduce((a, b) => {
      return a + b.unitPrice * b.sold;
    }, 0);

    return (
      <>
        {this.state.isFetching ? (
          "Loading..."
        ) : (
          <div className="product-list">
            <div className="filterWrap">
              <label htmlFor="product-filter">Search Products</label>
              <input
                id="product-filter"
                type="text"
                onChange={(e) => handleFilterChange(e)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <ProductItem productData={filteredProducts}></ProductItem>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>{formatNumber(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </>
    );
  }
}

export default App;
