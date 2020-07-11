function insertProduct(title, description, price, category) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/addProduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        description,
        price,
        category,
      }),
      method: "post",
    })
      .then((res) => {
        if (res.status == 200) res.json();
        else reject(false);
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export default insertProduct;
