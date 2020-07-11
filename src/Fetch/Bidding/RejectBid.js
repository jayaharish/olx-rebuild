function rejectBid(id, buyer) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/bidding/reject", {
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
        console.log("Rejecting bid");
      })
      .catch((err) => reject(err));
  });
}
export default rejectBid;
