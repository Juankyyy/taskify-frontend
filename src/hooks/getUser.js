export const getUser = async (token) => {
    const res= await fetch("http://localhost:5000/api/users/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Error al obtener usuario");       
    return res.json();
}