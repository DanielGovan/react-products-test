import React, { Component } from "react";

import "./App.css";

// Todos: take out products gatherer into its own file
// Make the programming functional
// sort the filter and the testing >.<

const formatNumber = (number) =>
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

    Promise.all(
      [1, 2, 3].map((i) =>
        fetch(`/api/branch${i}.json`).then((res) => res.json())
      )
    )
      .then((result) => {
        // grab all products
        const allProducts = [
          ...result[0].products,
          ...result[1].products,
          ...result[2].products,
        ];
        const sumProds = allProducts.reduce((accumulator, val) => {
          const o = accumulator
            .filter((obj) => {
              return obj.name == val.name;
            })
            .pop() || {
            id: val.id,
            name: val.name,
            unitPrice: val.unitPrice,
            sold: 0,
          };
          o.sold += val.sold;
          accumulator.push(o);
          return [...new Set(accumulator)];
        }, []);

        this.setState({
          isFetching: false,
          loadedProducts: sortProducts(sumProds),
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
                <td>{formatNumber(product.unitPrice * product.sold)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{formatNumber(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default App;
