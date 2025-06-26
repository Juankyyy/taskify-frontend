export const getFolders = async (token) => {
    const res = await fetch("http://localhost:5000/api/folders/get/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Error al obtener carpetas");       
    return res.json();
}