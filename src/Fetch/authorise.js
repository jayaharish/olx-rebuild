function authorise() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:9999/verifyToken", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else reject(false);
      })
      .then((res) => resolve(res))
      .catch((err) => reject(false));
  });
}
export default authorise;
