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
    } else if (type === "list-edit") {
      await createFunction(formState);
    } else if (type === "folder-edit") {
      await createFunction(formState);
    } else if (type === "move-task") {
      await createFunction(formState.task, formState.newListId);
      setFormState(initialForm);
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
