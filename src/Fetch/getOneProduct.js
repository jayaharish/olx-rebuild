function getOneProduct(id) {
  console.log("sending request");
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/getProduct", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      credentials: "include",
      method: "post",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
export default getOneProduct;
