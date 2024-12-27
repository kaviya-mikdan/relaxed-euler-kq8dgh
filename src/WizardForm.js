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

  const {
    handleSubmit,
    getValues,
    formState: { isValid },
  } = methods;

  const handleComplete = (data) => {
    console.log("Final Form Data:", { ...formData, ...data }); // Combine formData with final step data
  };

  const onNextStep = (data) => {
    const accumulatedData = { ...formData, ...data };
    setFormData(accumulatedData);
    console.log("Current Step Data:", accumulatedData);

    if (stepIndex < stepSchemas.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      handleSubmit(handleComplete)(); // Submit on final step
    }
  };

  const onBackStep = () => {
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1); // Move to the previous step
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
        <StepForm onSubmit={onNextStep}>
          {steps[stepIndex]}

          <div className="flex justify-between mt-4">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={onBackStep}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Back
              </button>
            )}

            <button
              type="submit"
              disabled={!isValid}
              className={`px-4 py-2 rounded ${
                isValid ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
              }`}
            >
              {stepIndex === stepSchemas.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </StepForm>
      </Wizard>
    </FormProvider>
  );
};

export default WizardForm;
