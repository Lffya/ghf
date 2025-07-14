"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

const activityLevels = [
  "No Exercise (Or Very Little)",
  "Light Exercise (1-3 days/week)",
  "Moderate Exercise (3-5 days/week)",
  "Heavy Exercise (6-7 days/week)",
  "Very Heavy Exercise (twice/day, extra heavy workouts)",
];

const workTypes = ["Desk Job", "Field Work", "Mixed"];

const sittingHours = [
  "Less than 2 hours",
  "2-4 hours",
  "4-6 hours",
  "6-8 hours",
  "More than 8 hours",
];

const foodPrefs = ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"];

const goals = ["Lose Weight", "Maintain Weight", "Gain Weight"];

const genderIcons = [
  { value: "male", icon: "👨" },
  { value: "female", icon: "👩" },
];

export default function BMIPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [gender, setGender] = useState("male");
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    activity: activityLevels[0],
    work: "",
    sitting: "",
    food: "",
    goal: "",
  });
  const [error, setError] = useState("");
  const [bmiResult, setBmiResult] = useState<null | { bmi: number; category: string }>(null);

  const handleChange = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBmiResult(null);
    if (!form.age || !form.height || !form.weight) {
      setError("Please fill all required fields.");
      return;
    }

    const heightInMeters = parseFloat(form.height) / 100;
    const weight = parseFloat(form.weight);
    const bmi = weight / (heightInMeters * heightInMeters);
    let category = "";

    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal weight";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    setBmiResult({ bmi: parseFloat(bmi.toFixed(1)), category });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full flex flex-col md:flex-row h-[90vh]">
              {/* Left: Scrollable Form */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto relative">
                {/* Sticky Close Button */}
                <button
                  className="sticky top-0 z-50 bg-white p-2 text-2xl text-gray-400 hover:text-red-500 float-right"
                  onClick={onClose}
                  aria-label="Close"
                >
                  &times;
                </button>

                <div className="mb-6 mt-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-2">
                    Calculate Your BMI – Start Your Wellness Journey
                  </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex gap-4">
                      {genderIcons.map((g) => (
                        <button
                          key={g.value}
                          type="button"
                          className={`w-16 h-16 rounded-lg border-2 text-3xl flex items-center justify-center transition ${
                            gender === g.value
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 bg-gray-50"
                          }`}
                          onClick={() => setGender(g.value)}
                          aria-label={g.value}
                        >
                          {g.icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        How old are you? *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        min={1}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        Height *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.height}
                        onChange={(e) => handleChange("height", e.target.value)}
                        min={1}
                        placeholder="cm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        Weight *
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.weight}
                        onChange={(e) => handleChange("weight", e.target.value)}
                        min={1}
                        placeholder="kg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        Activity Level
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.activity}
                        onChange={(e) => handleChange("activity", e.target.value)}
                      >
                        {activityLevels.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        What Type Of Work?
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.work}
                        onChange={(e) => handleChange("work", e.target.value)}
                      >
                        <option value="">Select</option>
                        {workTypes.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        How Many Hours Sitting?
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.sitting}
                        onChange={(e) => handleChange("sitting", e.target.value)}
                      >
                        <option value="">Select</option>
                        {sittingHours.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        Preferred Veg Or Non-Veg?
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.food}
                        onChange={(e) => handleChange("food", e.target.value)}
                      >
                        <option value="">Select</option>
                        {foodPrefs.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-green-700 font-semibold mb-1">
                        What Is Your Goal?
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 text-black"
                        value={form.goal}
                        onChange={(e) => handleChange("goal", e.target.value)}
                      >
                        <option value="">Select</option>
                        {goals.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
                  >
                    Calculate BMI
                  </button>
                </form>

                {/* BMI Result Card */}
                {bmiResult && (
                  <div className="mt-6 p-6 border-2 border-green-600 rounded-xl bg-green-50 shadow-md text-center">
                    <h3 className="text-xl font-bold text-green-700 mb-2">Your BMI Result</h3>
                    <p className="text-3xl font-bold text-black">{bmiResult.bmi}</p>
                    <p className="text-lg font-semibold text-green-800 mt-1">{bmiResult.category}</p>
                  </div>
                )}
              </div>

              {/* Right: Pyramid Image */}
              <div className="hidden md:flex flex-col items-center justify-start bg-green-600 p-6 min-w-[320px] h-full sticky top-0">
                <div className="rounded-xl bg-white p-2">
                  <Image
                    src="/pyramid.jpg"
                    alt="Healthy Eating Pyramid"
                    width={256}
                    height={256}
                    className="w-full max-w-xs h-auto object-contain"
                  />
                </div>
                <div className="text-white text-lg font-bold mt-4 text-center">
                  Healthy Eating Pyramid
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
