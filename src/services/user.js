const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const AUTH_URL = `${PREFIX_API}/users/login`;
const SIGNUP_URL = `${PREFIX_API}/users/register`;

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

    if (!response.ok) {
      return { ok: false, message: data.message };
    } else {
      return { ok: true, message: data.message, token: data.token, name: data.user.name, avatar: data.user.imageUrl };
    }
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message };
    } else {
      return { ok: true, data: data.message };
    }
  } catch (err) {
    console.error(err);
  }
};

export const user = {
  auth,
  signup,
};
