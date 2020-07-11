function removeProduct(id) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/removeproduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        id,
      }),
    })
      .then((result) => {
        console.log("removed product");
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
export default removeProduct;
