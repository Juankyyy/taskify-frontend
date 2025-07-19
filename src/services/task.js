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

export const archiveTask = async (taskId, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/archive/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al archivar la tarea" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getTrash = async (token) => {
  try {
    const response = await fetch(`${TASKS_URL}/trash`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al obtener las tareas eliminadas" };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const emptyTrash = async (token) => {
  try {
    const response = await fetch(`${TASKS_URL}/empty-trash`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al vaciar la papelera" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const restoreTask = async (taskId, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/restore/${taskId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al restaurar la tarea" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteTask = async (taskId, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/delete/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al eliminar la tarea" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateTask = async (taskId, title, description, priority, completed, token) => {
  try {
    const response = await fetch(`${TASKS_URL}/update/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        completed,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al actualizar la tarea" };
    } else {
      return data.message;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};