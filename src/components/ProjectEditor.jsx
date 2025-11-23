import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ProjectEditor({ project, onChange, onSave, onCancel, disabled }) {
  const [draft, setDraft] = useState({ title: "", description: "", status: "draft" });

  useEffect(() => {
    if (project) {
      setDraft({
        title: project.title || "",
        description: project.description || "",
        status: project.status || "draft",
      });
    }
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
    onChange?.({ ...draft, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(draft);
  };

  return (
    <form onSubmit={handleSubmit} className="project-editor">
      <div className="field">
        <label htmlFor="project-title">Title</label>
        <input
          id="project-title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          placeholder="Give your project a clear name"
          required
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          name="description"
          value={draft.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the goals, constraints, or stakeholders"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="project-status">Status</label>
        <select
          id="project-status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="draft">Draft</option>
          <option value="in-progress">In Progress</option>
          <option value="review">In Review</option>
          <option value="complete">Complete</option>
        </select>
      </div>

      <div className="actions">
        <button type="submit" disabled={disabled}>
          Save Project
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={disabled}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

ProjectEditor.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  disabled: PropTypes.bool,
};

ProjectEditor.defaultProps = {
  project: undefined,
  onChange: undefined,
  onSave: undefined,
  onCancel: undefined,
  disabled: false,
};

export default ProjectEditor;
