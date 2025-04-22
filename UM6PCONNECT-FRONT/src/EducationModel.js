import React, { useState } from "react";

const EducationModel = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: { month: "", year: "" },
    endDate: { month: "", year: "" },
    grade: "",
    activities: "",
    description: "",
    skills: [],
    media: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (e, type, field) => {
    setFormData({
      ...formData,
      [type]: { ...formData[type], [field]: e.target.value },
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Education</h2>

        <label>School*</label>
        <input
          type="text"
          name="school"
          placeholder="Ex: Boston University"
          value={formData.school}
          onChange={handleChange}
        />

        <label>Degree</label>
        <input
          type="text"
          name="degree"
          placeholder="Ex: Bachelor's"
          value={formData.degree}
          onChange={handleChange}
        />

        <label>Field of Study</label>
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Ex: Business"
          value={formData.fieldOfStudy}
          onChange={handleChange}
        />

        <label>Start Date</label>
        <select onChange={(e) => handleDateChange(e, "startDate", "month")}>
          <option value="">Month</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          onChange={(e) => handleDateChange(e, "startDate", "year")}
        />

        <label>End Date</label>
        <select onChange={(e) => handleDateChange(e, "endDate", "month")}>
          <option value="">Month</option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
        </select>
        <input
          type="number"
          placeholder="Year"
          onChange={(e) => handleDateChange(e, "endDate", "year")}
        />

        <label>Grade</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        />

        <label>Activities and Societies</label>
        <textarea
          name="activities"
          placeholder="Ex: Volleyball, Music Band"
          value={formData.activities}
          onChange={handleChange}
        ></textarea>

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <div className="buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EducationModel;
