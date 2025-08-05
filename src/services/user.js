const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const AUTH_URL = `${PREFIX_API}/users/login`;
const SIGNUP_URL = `${PREFIX_API}/users/register`;
const AVATAR_URL = `${PREFIX_API}/users/avatar`;
const USER_URL = `${PREFIX_API}/users/me`;

export const auth = async (email, password) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message };
    } else {
      return {
        ok: true,
        message: data.message,
        user: {
          name: data.user.name,
          email: data.user.email,
        },
        avatar: data.user.imageUrl,
      };
    }
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al iniciar sesión" };
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message };
    } else {
      return { ok: true, message: data.message };
    }
  } catch (err) {
    console.error(err);
    return { ok: false, message: "Error al registrar usuario" };
  }
};

export const changeAvatar = async (avatar) => {
  try {
    const avatarFile = new FormData();
    avatarFile.append("image", avatar);
    const response = await fetch(`${AVATAR_URL}/update`, {
      method: "PATCH",
      credentials: "include",
      body: avatarFile,
    });
    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await fetch(USER_URL, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("No autenticado");

    const data = await res.json();

    if (!res.ok) {
      return { error: true, message: data.message };
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
};

export const logout = async () => {
  try {
    await fetch(`${PREFIX_API}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const deleteAvatar = async (token) => {
  try {
    const response = await fetch(`${AVATAR_URL}/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: null,
    });
    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
  }
};

export const user = {
  auth,
  signup,
  changeAvatar,
  fetchCurrentUser,
  logout,
  deleteAvatar,
};
