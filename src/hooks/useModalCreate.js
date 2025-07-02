import { useState } from "react";
import toast from "react-hot-toast";

export const useModalCreate = (initialForm, createFunction = null) => {
  const [formState, setFormState] = useState(initialForm);

  const notifySuccess = (message) => toast.success(message);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createFunction(formState.folderName);
    notifySuccess(`Carpeta ${formState.folderName} creada`);
    
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
  };
};
