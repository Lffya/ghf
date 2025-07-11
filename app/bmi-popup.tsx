"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

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
	{ value: "male", icon: "/male.svg" },
	{ value: "female", icon: "/female.svg" },
];

const pyramidImg = "/pyramid.png"; // Replace with your actual image path

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
	const [bmi, setBmi] = useState<number | null>(null);
	const [bmiMsg, setBmiMsg] = useState("");
	const [error, setError] = useState("");

	const handleChange = (field: string, value: string) => {
		setForm((f) => ({ ...f, [field]: value }));
	};

	const handleCalculate = (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setBmi(null);
		setBmiMsg("");
		if (!form.age || !form.height || !form.weight) {
			setError("Please fill all required fields.");
			return;
		}
		const heightM = Number(form.height) / 100;
		const weight = Number(form.weight);
		if (heightM <= 0 || weight <= 0) {
			setError("Please enter valid height and weight.");
			return;
		}
		const bmiVal = weight / (heightM * heightM);
		setBmi(bmiVal);
		if (bmiVal < 18.5) setBmiMsg("Underweight");
		else if (bmiVal < 25) setBmiMsg("Normal weight");
		else if (bmiVal < 30) setBmiMsg("Overweight");
		else setBmiMsg("Obese");
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
						className="fixed inset-0 z-50 flex items-center justify-center px-2 py-6 overflow-auto"
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
					>
						<div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
							{/* Left: BMI Form */}
							<div className="flex-1 p-6 md:p-10">
								<button
									className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500"
									onClick={onClose}
									aria-label="Close"
								>
									&times;
								</button>
								<div className="mb-6">
									<h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-2">
										Calculate Your BMI – Start Your Wellness Journey
									</h2>
								</div>
								<form className="space-y-4" onSubmit={handleCalculate}>
									<div className="flex flex-col items-center mb-4">
										<Image
											src="/bmi-logo.png"
											alt="BMI"
											width={64}
											height={64}
											className="h-16 mb-2"
											priority
										/>
										<div className="flex gap-4">
											{genderIcons.map((g) => (
												<button
													key={g.value}
													type="button"
													className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition ${
														gender === g.value
															? "border-green-500 bg-green-50"
															: "border-gray-200 bg-gray-50"
													}`}
													onClick={() => setGender(g.value)}
													aria-label={g.value}
												>
													<Image
														src={g.icon}
														alt={g.value}
														width={40}
														height={40}
														className="w-10 h-10"
														priority
													/>
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
												onChange={(e) =>
													handleChange("age", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("height", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("weight", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("activity", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("work", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("sitting", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("food", e.target.value)
												}
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
												onChange={(e) =>
													handleChange("goal", e.target.value)
												}
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
										className="w-full mt-2 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
									>
										Calculate
									</button>
								</form>
							</div>
							{/* Right: Pyramid Image */}
							<div className="hidden md:flex flex-col items-center justify-center bg-green-600 p-8 min-w-[320px]">
								<div className="rounded-xl bg-white p-2">
									<Image
										src={pyramidImg}
										alt="Healthy Eating Pyramid"
										width={256}
										height={256}
										className="w-64 h-64 object-contain"
										priority
									/>
								</div>
								<div className="text-white text-lg font-bold mt-4">
									Healthy Eating Pyramid
								</div>
								{bmi && (
									<div className="mt-8 w-full bg-white rounded-xl shadow p-6 flex flex-col items-center">
										<div className="text-2xl font-bold text-green-700 mb-2">
											Your BMI: {bmi.toFixed(2)}
										</div>
										<div className="text-lg font-semibold text-gray-700">
											{bmiMsg}
										</div>
									</div>
								)}
							</div>
							{/* BMI Result for Mobile */}
							<div className="block md:hidden p-4">
								{bmi && (
									<div className="mt-4 text-center">
										<div className="text-xl font-bold text-black">
											Your BMI: {bmi.toFixed(2)}
										</div>
										<div className="text-green-700 font-semibold">
											{bmiMsg}
										</div>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
