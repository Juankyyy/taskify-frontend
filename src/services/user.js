// const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const PREFIX_API = "http://localhost:5000/api";
const AUTH_URL = `${PREFIX_API}/users/login`;
const SIGNUP_URL = `${PREFIX_API}/users/register`;
const AVATAR_URL = `${PREFIX_API}/users/avatar`;

export const auth = async (email, password) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include", // 👈 correcto
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message };
    } else {
      // ✅ El token ya está en la cookie, no necesitas devolverlo
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
      credentials: "include", // ✅ Para establecer sesión tras registro
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

const fetchCurrentUser = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/me", {
      credentials: "include", // 👈 incluye la cookie HTTPOnly
    });

    if (!res.ok) throw new Error("No autenticado");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    return null;
  }
};

const logout = async () => {
  try {
    await fetch(`${PREFIX_API}/users/logout`, {
      credentials: "include",
      method: "POST",
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const user = {
  auth,
  signup,
  changeAvatar,
  fetchCurrentUser,
  logout,
};
