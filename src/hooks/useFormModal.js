import { useState } from "react";

export const useFormModal = (initialForm, createFunction, type) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type === "folder") {
      await createFunction(formState.folderName);
      setFormState(initialForm);
    } else if (type === "list") {
      await createFunction(formState.title, formState.folderId);
      setFormState(initialForm);
    } else if (type === "task") {
      await createFunction(
        formState.title,
        formState.description,
        formState.priority,
        formState.listId,
        formState.folderId
      );
      setFormState(initialForm);
    } else if (type === "task-edit") {
      await createFunction(formState);
    }
  };

  return {
    ...formState,
    formState,
    setFormState,
    onSubmit,
    onInputChange,
  };
};
