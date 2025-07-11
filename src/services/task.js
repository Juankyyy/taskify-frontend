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
      return { error: true, message: "Error al obtener las tareas" };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const completeTask = async (taskId, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/toggle/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al completar la tarea" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createTask = async (
  title,
  description,
  priority,
  listId,
  folderId,
  token
) => {
  try {
    const response = await fetch(`${TASKS_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        listId,
        folderId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al crear tarea" };
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
  completeTask,
};
