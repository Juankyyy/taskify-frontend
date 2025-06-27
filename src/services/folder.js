const PREFIX_API = "http://localhost:5000/api";
const FOLDERS_URL = `${PREFIX_API}/folders/get`;
const LISTS_URL = `${PREFIX_API}/lists/get`;

export const getFolders = async (token) => {
  try {
    const response = await fetch(FOLDERS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: "Error al obtener carpetas" };
    } else {
      return { ok: true, data: data };
    }
  } catch (err) {
    console.error(err);
  }
};

export const getLists = async (folders, token) => {
  const listsPerFolder = await Promise.all(
    folders.map(async (folder) => {
      const response = await fetch(`${LISTS_URL}/${folder._id}`, {
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

export const folder = {
  getFolders,
  getLists,
};
