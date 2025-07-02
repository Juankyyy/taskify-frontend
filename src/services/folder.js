const PREFIX_API = "https://taskify-backend-98jt.onrender.com/api";
const FOLDERS_URL = `${PREFIX_API}/folders`;
const LISTS_URL = `${PREFIX_API}/lists`;

export const getFolders = async (token) => {
  try {
    const response = await fetch(`${FOLDERS_URL}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getLists = async (folders, token) => {
  const listsPerFolder = await Promise.all(
    folders.map(async (folder) => {
      const response = await fetch(`${LISTS_URL}/get/${folder._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export const deleteFolder = async (folderId, token) => {
  try {
    const response = await fetch(`${FOLDERS_URL}/delete/${folderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const createFolder = async (folderName, token) => {
  try {
    const response = await fetch(`${FOLDERS_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: folderName,
      }),
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

export const folder = {
  getFolders,
  getLists,
  deleteFolder,
  createFolder,
};
