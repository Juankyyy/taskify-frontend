export const getListsByFolder = async (folders, token) => {
    const headers = { Authorization: `Bearer ${token}` };

    const listsPerFolder = await Promise.all(
        folders.map(async (folder) =>{
            const res = await fetch(
                `http://localhost:5000/api/lists/get/${folder._id}`,
                { headers }
            );
            if (!res.ok) throw new Error(`Error al obtener listas de la carpeta ${folder.name}`);
            return res.json(); //devolvemos el array con una lista de carpetas
        })
    )
    return listsPerFolder.flat(); // Aplanamos el array de listas
}   