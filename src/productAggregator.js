export const productAggregator = () => {
  return Promise.all(
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
            return obj.name === val.name;
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

      return sumProds;
    })
    .catch((err) => {
      console.log(err);
    });
  return "TEST1";
};
