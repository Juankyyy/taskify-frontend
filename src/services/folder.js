const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const FOLDERS_URL = `${PREFIX_API}/folders`;
const LISTS_URL = `${PREFIX_API}/lists`;

export const getFolders = async () => {
  try {
    const response = await fetch(`${FOLDERS_URL}/get`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: "Error al obtener carpetas" };
    } else {
      return data;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLists = async (folders) => {
  const listsPerFolder = await Promise.all(
    folders.map(async (folder) => {
      const response = await fetch(`${LISTS_URL}/get/${folder._id}`, {
        credentials: "include", // ✅ Envia cookie HttpOnly
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          ok: false,
          message: `Error al obtener listas de la carpeta ${folder.name}`,
        };
      } else {
        return data;
      }
    })
  );
  return listsPerFolder.flat();
};

export const deleteFolder = async (folderId) => {
  try {
    const response = await fetch(`${FOLDERS_URL}/delete/${folderId}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: "Error al eliminar la carpeta" };
    } else {
      return { ok: true, data: data };
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createFolder = async (folderName) => {
  try {
    const response = await fetch(`${FOLDERS_URL}/create`, {
      method: "POST",
      credentials: "include", // ✅ Envia cookie HttpOnly
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: folderName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createList = async (listName, folderId) => {
  try {
    const response = await fetch(`${LISTS_URL}/create`, {
      method: "POST",
      credentials: "include", // ✅ Envia cookie HttpOnly
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: listName,
        folderId: folderId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: data.message };
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteList = async (listId) => {
  try {
    const response = await fetch(`${LISTS_URL}/delete/${listId}`, {
      method: "DELETE",
      credentials: "include", // ✅ Envia cookie HttpOnly
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: true, message: "Error al eliminar la lista" };
    }
    return data.message
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const folder = {
  getFolders,
  getLists,
  deleteFolder,
  createFolder,
  deleteList,
};
