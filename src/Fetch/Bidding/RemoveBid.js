function removeBid(id, buyer) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/bidding/remove", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        id,
        buyer,
      }),
    })
      .then((result) => {
        console.log("Removed bid");
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
export default removeBid;
