import { useState } from "react";

export const useModalCreate = (initialForm, createFunction, type = "folder") => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formState)
    {type === "folder" ? await createFunction(formState.folderName) : await createFunction(formState.title, formState.folderId)}
  };

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
  };
};
