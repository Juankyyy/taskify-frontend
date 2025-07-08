const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const TASKS_URL = `${PREFIX_API}/tasks`;

export const getTasks = async (listId, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/list/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: "Error al obtener la tarea" };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const tasks = {
  getTasks,
};
