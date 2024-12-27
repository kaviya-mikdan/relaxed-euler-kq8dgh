import "./styles.css";

import React from "react";
import WizardForm from "./WizardForm";

function App() {
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Multi-Step Wizard Form</h1>
      <WizardForm />
    </div>
  );
}

export default App;
