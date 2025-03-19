import React from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder }) => (
  <div className="mb-4">
    <label className="block font-semibold mb-1">{label}</label>
    <input
      type="number"
      placeholder={placeholder}
      className="w-full p-3 rounded-lg bg-red-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
    />
  </div>
);

const TankMonitorForm: React.FC = () => {
  return (
    <div className="bg-red-700 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        <i className="fas fa-gas-pump"></i> RB1 - Sous Douane
      </h2>

      <InputField label="Creux (mm)" placeholder="19566.3" />
      <InputField label="Hauteur Total Témoin (mm)" placeholder="20786" />

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField label="Température 1 (°C)" placeholder="32.2" />
        <InputField label="Température 2 (°C)" placeholder="43.5" />
        <InputField label="Température 3 (°C)" placeholder="39.8" />
      </div>

      <InputField label="Jauge Manuelle (mm)" placeholder="1219.7" />
      <InputField label="Volume Observé Avant (m³)" placeholder="60486.5388" />
      <InputField label="Volume Libéré (m³)" placeholder="45001.98561" />
      <InputField label="Volume Corrigé (m³)" placeholder="45001.98561" />
      <InputField label="Densité (kg/m³)" placeholder="200" />
      <InputField label="VCF (m³)" placeholder="0.744" />
      <InputField label="GSV Libéré Avant" placeholder="45001.98561" />
      <InputField label="Tonne Métrique" placeholder="9000397.122" />

      <div className="flex justify-between mt-8">
        <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300">
          <i className="fas fa-forward-step"></i> Passer
        </button>
        <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-500">
          <i className="fas fa-save"></i> Enregistrer
        </button>
      </div>
    </div>
  );
};

export default TankMonitorForm;
