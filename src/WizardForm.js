import React, { useState } from "react";
import { Wizard } from "react-use-wizard";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from "./validationSchemas";
import StepForm from "./StepForm";

const stepSchemas = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];

const StepContent = ({ name, label }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        className="mt-1 block w-full border border-gray-300 rounded"
      />
      <p className="text-red-500 text-sm">{errors[name]?.message}</p>
    </div>
  );
};

const WizardForm = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  // Use `getValues` to fetch all the values at the final submission
  const methods = useForm({
    resolver: zodResolver(stepSchemas[stepIndex]),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const { handleSubmit, getValues } = methods;

  const handleComplete = (data) => {
    console.log("Final Form Data:", { ...formData, ...data }); // Combine formData with final step data
  };

  const onNextStep = (data) => {
    // Combine the current step data with the accumulated form data
    const accumulatedData = { ...formData, ...data };
    setFormData(accumulatedData); // Save accumulated form data

    console.log("Current Step Data:", accumulatedData); // Log accumulated data after each step

    // Ensure next step
    if (stepIndex < stepSchemas.length - 1) {
      setStepIndex((prev) => prev + 1); // Move to the next step
    } else {
      handleSubmit(handleComplete)(); // Submit on final step
    }
  };

  const steps = [
    <StepContent name="firstName" label="First Name" />,
    <StepContent name="lastName" label="Last Name" />,
    <StepContent name="email" label="Email" />,
    <StepContent name="phone" label="Phone" />,
    <StepContent name="address" label="Address" />,
  ];

  return (
    <FormProvider {...methods}>
      <Wizard>
        <StepForm onSubmit={onNextStep}>{steps[stepIndex]}</StepForm>
      </Wizard>
    </FormProvider>
  );
};

export default WizardForm;
