import { useState } from "react";

export const useModalCreate = (initialForm, createFunction = null) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createFunction(formState.folderName);
  };

  return {
    ...formState,
    formState,
    onSubmit,
    onInputChange,
  };
};
