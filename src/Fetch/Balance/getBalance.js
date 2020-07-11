function getBalance() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/balance", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "get",
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
export default getBalance;
