"use client";
import React, { useState } from "react";
import Image from "next/image";

const initialState = {
  fullName: "",
  gender: "",
  email: "",
  phone: "",
  linkedin: "",
  position: "",
  availability: "",
  location: "",
  qualification: "",
  graduation: "",
  experience: "",
  employer: "",
  currentSalary: "",
  salaryExpectations: "",
  referenceName: "",
  referenceContact: "",
  portfolio: "",
  disability: "",
  keySkills: "",
  whyWork: "",
  file: null as File | null,
  certify: false,
};

const genders = ["Male", "Female", "Other"];
const availabilities = ["Immediate", "15 Days", "30 Days", "60 Days"];
const experiences = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
const disabilities = ["No", "Yes"];

export default function JoinOurTeamPage() {
  const [form, setForm] = useState(initialState);
  const [fileName, setFileName] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: (target as HTMLInputElement).checked });
    } else if (type === "file") {
      const files = (target as HTMLInputElement).files;
      setForm({ ...form, file: files && files[0] });
      setFileName(files && files[0] ? files[0].name : "");
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen bg-[#fafcf8] flex items-center justify-center py-10 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-12 space-y-12 border border-[#8dc63f]/20"
        autoComplete="off"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-[#8dc63f] tracking-tight">Join Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <input name="fullName" required placeholder="Full Name *" className="input" value={form.fullName} onChange={handleChange} />
          <select name="gender" required className="input" value={form.gender} onChange={handleChange}>
            <option value="">Gender</option>
            {genders.map(g => <option key={g}>{g}</option>)}
          </select>
          <input name="email" required type="email" placeholder="Email *" className="input" value={form.email} onChange={handleChange} />
          <div className="flex items-center input">
            <span className="mr-2 flex items-center">
              <Image src="https://flagcdn.com/in.svg" alt="IN" width={20} height={20} className="w-5 h-5 mr-1 rounded" />
              <span className="text-[#8dc63f] font-semibold">+91</span>
            </span>
            <input name="phone" required type="tel" placeholder="Phone" className="flex-1 outline-none bg-transparent text-[#8dc63f] font-semibold" value={form.phone} onChange={handleChange} maxLength={10} />
          </div>
          <input name="linkedin" placeholder="LinkedIn Profile (Use Link)" className="input" value={form.linkedin} onChange={handleChange} />
          <input name="position" required placeholder="Position Applied For *" className="input" value={form.position} onChange={handleChange} />
          <select name="availability" className="input" value={form.availability} onChange={handleChange}>
            <option value="">Availability to Join</option>
            {availabilities.map(a => <option key={a}>{a}</option>)}
          </select>
          <input name="location" required placeholder="Location *" className="input" value={form.location} onChange={handleChange} />
          <input name="qualification" required placeholder="Highest Qualification *" className="input" value={form.qualification} onChange={handleChange} />
          <input name="graduation" placeholder="Year of Graduation" className="input" value={form.graduation} onChange={handleChange} />
          <select name="experience" className="input" value={form.experience} onChange={handleChange}>
            <option value="">Years of Relevant Experience</option>
            {experiences.map(e => <option key={e}>{e}</option>)}
          </select>
          <input name="employer" placeholder="Current/Last Employer" className="input" value={form.employer} onChange={handleChange} />
          <input name="currentSalary" placeholder="Current Salary (Per Month)" className="input" value={form.currentSalary} onChange={handleChange} />
          <input name="salaryExpectations" placeholder="Salary Expectations" className="input" value={form.salaryExpectations} onChange={handleChange} />
          <input name="referenceName" placeholder="Reference Name" className="input" value={form.referenceName} onChange={handleChange} />
          <input name="referenceContact" placeholder="Reference Contact" className="input" value={form.referenceContact} onChange={handleChange} />
          <input name="portfolio" placeholder="Portfolio/Work Samples (use link)" className="input" value={form.portfolio} onChange={handleChange} />
          <select name="disability" className="input" value={form.disability} onChange={handleChange}>
            <option value="">Are you a person with a disability?</option>
            {disabilities.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <textarea name="keySkills" placeholder="Key Skills" className="input min-h-[60px]" value={form.keySkills} onChange={handleChange} />
          <textarea name="whyWork" placeholder="Why Do You Want to Work With Us?" className="input min-h-[60px]" value={form.whyWork} onChange={handleChange} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <label className="w-full md:w-auto flex-1">
            <span className="block mb-2 font-semibold text-[#8dc63f]">Resume/CV Upload (PDF)</span>
            <input
              type="file"
              name="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleChange}
            />
            <div className="flex items-center gap-2">
              <button type="button" className="bg-[#8dc63f] text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#7ab82e] transition shadow text-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16v-8m0 8l-4-4m4 4l4-4M4 20h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {fileName ? fileName : "Upload PDF"}
              </button>
              {fileName && (
                <span className="text-[#8dc63f] font-semibold text-sm">PDF</span>
              )}
            </div>
          </label>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <input type="checkbox" name="certify" checked={form.certify} onChange={handleChange} className="accent-[#8dc63f] w-5 h-5 rounded border-2 border-[#8dc63f] focus:ring-2 focus:ring-[#8dc63f]" required />
          <span className="text-[#8dc63f] text-base">I certify that the information provided is true and accurate. *</span>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-[#8dc63f] text-white font-bold text-xl shadow-lg hover:bg-[#7ab82e] transition disabled:opacity-60 mt-2"
          disabled={!form.certify}
        >
          Submit
        </button>
        <style jsx>{`
          .input {
            @apply bg-white border border-[#8dc63f] rounded-xl px-4 py-3 text-base text-[#8dc63f] focus:outline-none focus:ring-2 focus:ring-[#8dc63f] placeholder-[#8dc63f] transition shadow-sm hover:border-green-500 focus:border-green-500;
          }
        `}</style>
      </form>
    </div>
  );
}
