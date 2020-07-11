function removeBalance(amount, email) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/balance/reduce", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "post",
      body: JSON.stringify({
        amount,
        email,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("reducing balance");
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}
export default removeBalance;
