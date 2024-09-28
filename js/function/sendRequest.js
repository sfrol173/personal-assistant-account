export async function sendRequestAutorisation(url, method = "GET", options) {
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  if (response.ok) {
    const result = response.text();

    return result;
  } else {
    return false;
  }
}

export async function sendRequest(url, method = "GET", options) {
  const response = await fetch(url, {
    method: method,
    ...options,
  });
  if (response.ok) {
    if (method !== "DELETE") {
      const result = response.json();
      return result;
    } else {
      return response;
    }
  } else {
    return new Error("Error");
  }
}
