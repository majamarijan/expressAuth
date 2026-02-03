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
    localStorage.removeItem("token");
  };
  return payload.exp < now;
}

export default isTokenExpired;