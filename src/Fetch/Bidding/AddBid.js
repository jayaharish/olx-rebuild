function addBid(amount, id, seller) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/bidding/add", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        amount,
        id,
        seller,
      }),
    })
      .then((result) => {
        console.log("Added");
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
export default addBid;
