import React, { useState } from "react";
import { useForm } from "react-hook-form";

const FormComponent = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [selectedExpertise, setSelectedExpertise] = useState([]);

  const handleExpertiseChange = (e) => {
    const { value, checked } = e.target;
    let updatedExpertise = [...selectedExpertise];

    if (checked) {
      updatedExpertise.push(value);
    } else {
      updatedExpertise = updatedExpertise.filter((item) => item !== value);
    }

    setSelectedExpertise(updatedExpertise);
    setValue("expertise", updatedExpertise);
  };

  const onSubmit = (data) => {
    alert(`Form Submitted!\n\n${JSON.stringify(data, null, 2)}`);
    console.log("Form Data:", data);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">React Hook Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              className="form-control"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <small className="text-danger">{errors.firstName.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              className="form-control"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName.message}</small>
            )}
          </div>

          <div className="form-check mb-3">
            <input
              id="employed"
              className="form-check-input"
              type="checkbox"
              {...register("employed")}
            />
            <label className="form-check-label" htmlFor="employed">
              Employed
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="education">
              Education
            </label>
            <select
              id="education"
              className="form-select"
              {...register("education", { required: "Education is required" })}
            >
              <option value="">Select Education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
            </select>
            {errors.education && (
              <small className="text-danger">{errors.education.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Expertise</label>
            <div className="d-flex flex-wrap gap-3">
              {["HTML", "CSS", "JavaScript"].map((exp, index) => (
                <div key={exp} className="form-check">
                  <input
                    id={`expertise-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    value={exp}
                    onChange={handleExpertiseChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`expertise-${index}`}
                  >
                    {exp}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Preferred Technology</label>
            <div className="d-flex flex-wrap gap-3">
              {["frontend", "backend", "fullstack"].map((tech, index) => (
                <div key={tech} className="form-check">
                  <input
                    id={`tech-${index}`}
                    className="form-check-input"
                    type="radio"
                    value={tech}
                    {...register("preferredTech", { required: "Select one" })}
                  />
                  <label className="form-check-label" htmlFor={`tech-${index}`}>
                    {tech.charAt(0).toUpperCase() + tech.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.preferredTech && (
              <small className="text-danger">
                {errors.preferredTech.message}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              className="form-control"
              {...register("notes")}
            />
          </div>

          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                reset();
                setSelectedExpertise([]);
              }}
            >
              Reset
            </button>
          </div>
        </form>

        <h3 className="mt-4">Feedback Data:</h3>
        <pre className="bg-light p-3 rounded">
          {JSON.stringify(watch(), null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default FormComponent;
