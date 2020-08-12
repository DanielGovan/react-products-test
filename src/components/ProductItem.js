import React from "react";
import { formatNumber } from "../App";

const ProductItem = ({ productData }) => (
  <>
    {productData.map(({ name, sold, unitPrice }) => (
      <tr key={name}>
        <td>{name}</td>
        <td>{formatNumber(unitPrice * sold)}</td>
      </tr>
    ))}
  </>
);

export default ProductItem;
