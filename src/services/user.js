const AUTH_URL = "http://localhost:5000/api/users/login";

export const auth = async (email, password) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    
    return data.token;
  } catch (error) {
    console.error(error);
  }
};

export const user = {
  auth,
};
