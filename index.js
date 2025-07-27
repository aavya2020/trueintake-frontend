import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [nutrient, setNutrient] = useState("");
  const [labelClaim, setLabelClaim] = useState("");
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        `https://trueintake-dsid.onrender.com/predict?nutrient=${encodeURIComponent(
          nutrient
        )}&label_claim=${labelClaim}&age_group=${ageGroup}`
      );
      setPrediction(response.data.predicted_amount);
      setError("");
    } catch (err) {
      setPrediction("");
      setError("Error: " + err.response?.data?.detail || "Prediction failed");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">
          TrueIntake AI: Dietary Supplement Estimator
        </h1>
        <p className="text-center text-gray-600">
          Enter the amount listed on the label of your dietary supplement.
          We’ll estimate what your body is likely to absorb, based on USDA DSID data.
        </p>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nutrient</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Calcium"
            value={nutrient}
            onChange={(e) => setNutrient(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Label Claim Amount</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., 400"
            value={labelClaim}
            onChange={(e) => setLabelClaim(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Age Group</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="Adult">Adult</option>
            <option value="Children_1_4">Children 1–4 years</option>
            <option value="Children_4_plus">Children 4+ years</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Estimate True Intake
        </button>

        {prediction && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Estimated True Intake: <strong>{prediction}</strong>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
