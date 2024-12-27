import React from "react";
import { useFormContext } from "react-hook-form";
import { useWizard } from "react-use-wizard";

const StepForm = ({ children, onSubmit = () => {} }) => {
  const { nextStep } = useWizard();
  const { handleSubmit } = useFormContext();

  const handleFormSubmit = (data) => {
    onSubmit(data); // Pass data from the current step
    nextStep(); // Move to the next step
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      {children}
    </form>
  );
};

export default StepForm;
