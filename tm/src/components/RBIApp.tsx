import React, { useState } from "react";

const initialFormData = {
  creux: 19566.3,
  hauteurTotal: 20786,
  temperature1: 32.2,
  temperature2: 43.5,
  temperature3: 0,
  tempMoyenne: 37.85,
  jaugeManuelle: 1219.7,
  hauteurLiquide: 1219.7,
  decimal: 1219,
  correspondanceTable: 60451.278,
  maxTable: 60501.662,
  volumeObserveAvant: 60486.5388,
  volumeObserveApres: 60486.5388,
  volumeLibere: 45001.99,
  volumeCorrige: 45001.99,
  density: 200,
  vcf: 0.744,
  gsvLibere: 45001.99,
  tonneMetrique: 9000397.12,
};

const InputField = ({ label, value, onChange, unit }) => (
  <div className="flex justify-between border-b border-gray-200 py-2">
    <span className="text-gray-600">{label}</span>
    <input
      type="number"
      className="text-right border border-gray-300 bg-gray-100 px-3 py-1 rounded w-40"
      value={value}
      onChange={onChange}
      style={{
        color: value ? "black" : "lightgray",
        fontStyle: value ? "normal" : "italic",
      }}
    />
    {unit && <span className="ml-2">{unit}</span>}
  </div>
);

export default function RBIApp() {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    const parsed = parseFloat(value);
    setFormData({ ...formData, [field]: isNaN(parsed) ? 0 : parsed });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <section className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Estimation pour la surveillance du réservoir RB1
        </h2>
        <p className="mt-4 text-gray-600">
          Surveillance et calcul des volumes de réservoir et de la densité pour
          un meilleur contrôle de stockage et de livraison.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong>Numéro d'estimation :</strong> 21-RB1202501
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span className="bg-green-200 border border-green-400 rounded-full px-2 py-1">
              Accepted
            </span>
          </div>
          <div>
            <strong>Date:</strong> Mar 19, 2025
          </div>
          <div>
            <strong>Date d'expiration:</strong> Mar 26, 2025
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Description & Mesures
        </h3>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
          {Object.entries({
            creux: "Creux (mm)",
            hauteurTotal: "Hauteur Total (mm)",
            temperature1: "Température 1 (°C)",
            temperature2: "Température 2 (°C)",
            temperature3: "Température 3 (°C)",
            tempMoyenne: "Température Moyenne (°C)",
            jaugeManuelle: "Jauge Manuelle (mm)",
            hauteurLiquide: "Hauteur Liquide dans le Bac (mm)",
            decimal: "Décimal",
            correspondanceTable: "Correspondance Table (mm)",
            maxTable: "Maxime Table (mm)",
            volumeObserveAvant: "Volume Observé Avant (m³)",
            volumeObserveApres: "Volume Observé Après (m³)",
            volumeLibere: "Volume Libéré (m³)",
            volumeCorrige: "Volume Corrigé (m³)",
          }).map(([key, label]) => (
            <InputField
              key={key}
              label={label}
              value={formData[key]}
              onChange={handleChange(key)}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Résumé & Coûts
        </h3>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
          {Object.entries({
            density: "Densité (kg/m³)",
            vcf: "VCF (m³)",
            gsvLibere: "GSV Libéré (m³)",
            tonneMetrique: "Tonne Métrique",
          }).map(([key, label]) => (
            <InputField
              key={key}
              label={label}
              value={formData[key]}
              onChange={handleChange(key)}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-lg">
          Retour
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg">
          Enregistrer
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg">
          Valider
        </button>
      </div>
    </div>
  );
}
