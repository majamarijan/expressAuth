function isTokenExpired(token) {
  if (!token) return true;
  // Split JWT into parts
  const payloadBase64 = token.split(".")[1];
  if (!payloadBase64) return true;
  // Decode payload
  const payloadJson = atob(payloadBase64);
  const payload = JSON.parse(payloadJson);
  // Compare exp to current time
  const now = Math.floor(Date.now() / 1000); // seconds
  console.log(payload.exp < now);
  if (payload.exp < now) {
    //localStorage.removeItem("token");
    //call the /refresh endpoint
    const data = getData();
    if (data) {
      data.then((d) => {
        console.log(d)
        if (d && d.accessToken) {
          localStorage.setItem("token", d.accessToken);
        }
      });
    }else {
      return true;
    }
  };
}

async function getData() {
  const res = await fetch("http://localhost:4000/secure/refresh", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export default isTokenExpired;