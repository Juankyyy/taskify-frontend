const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const USER_URL = `${PREFIX_API}/users`;

export const auth = async (email, password) => {
  try {
    const response = await fetch(`${USER_URL}/login`, {
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
    const response = await fetch(`${USER_URL}/register`, {
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
    const response = await fetch(`${USER_URL}/avatar/update`, {
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
    const res = await fetch(`${USER_URL}/me`, {
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

export const deleteAvatarByCookie = async () => {
  try {
    const response = await fetch(`${USER_URL}/avatar/delete`, {
      method: "DELETE",
      credentials: "include",
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

export const changeUsernameByCookie = async (username) => {
  try {
    const response = await fetch(`${USER_URL}/update-name`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName: username }),
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

export const changeEmailByCookie = async (email) => {
  try {
    const response = await fetch(`${USER_URL}/update-email`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newEmail: email }),
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

export const changePasswordbyCookie = async (currentPassword, newPassword) => {
  try {
    const response = await fetch(`${USER_URL}/change-password`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
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
  logout,
  changeAvatar,
  fetchCurrentUser,
  deleteAvatarByCookie,
  changeUsernameByCookie,
  changePasswordbyCookie,
};
