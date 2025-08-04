const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const TASKS_URL = `${PREFIX_API}/tasks`;

export const getTasks = async (listId) => {
  try {
    const response = await fetch(`${TASKS_URL}/list/${listId}`, {
      credentials: "include",
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

export const completeTask = async (taskId) => {
  try {
    const response = await fetch(`${TASKS_URL}/toggle/${taskId}`, {
      method: "PATCH",
      credentials: "include",
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

export const createTask = async (title, description, priority, listId, folderId) => {
  try {
    const response = await fetch(`${TASKS_URL}/create`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

export const archiveTask = async (taskId) => {
  try {
    const response = await fetch(`${TASKS_URL}/archive/${taskId}`, {
      method: "PATCH",
      credentials: "include",
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

export const getTrash = async () => {
  try {
    const response = await fetch(`${TASKS_URL}/trash`, {
      credentials: "include",
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

export const emptyTrash = async () => {
  try {
    const response = await fetch(`${TASKS_URL}/empty-trash`, {
      method: "DELETE",
      credentials: "include",
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

export const restoreTask = async (taskId) => {
  try {
    const response = await fetch(`${TASKS_URL}/restore/${taskId}`, {
      method: "PATCH",
      credentials: "include",
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

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${TASKS_URL}/delete/${taskId}`, {
      method: "DELETE",
      credentials: "include",
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

export const updateTask = async (taskId, title, description, priority, completed) => {
  try {
    const response = await fetch(`${TASKS_URL}/update/${taskId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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
export const task = {
  getTasks,
  completeTask,
  createTask,
  archiveTask,
  getTrash,
  emptyTrash,
  restoreTask,
  deleteTask,
  updateTask,
};