import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function SectionEditor({ section, onChange, onSave, onDelete, disabled }) {
  const [draft, setDraft] = useState({ title: "", content: "" });

  useEffect(() => {
    if (section) {
      setDraft({
        title: section.title || "",
        content: section.content || "",
      });
    }
  }, [section]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...draft, [name]: value };
    setDraft(updated);
    onChange?.(updated);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.(draft);
  };

  return (
    <form onSubmit={handleSubmit} className="section-editor">
      <div className="field">
        <label htmlFor="section-title">Section title</label>
        <input
          id="section-title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleChange}
          placeholder="Outline this section"
          required
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="section-content">Content</label>
        <textarea
          id="section-content"
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={5}
          placeholder="Add details, requirements, or decisions"
          disabled={disabled}
        />
      </div>

      <div className="actions">
        <button type="submit" disabled={disabled}>
          Save Section
        </button>
        {onDelete && (
          <button type="button" onClick={onDelete} disabled={disabled}>
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

SectionEditor.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
};

SectionEditor.defaultProps = {
  section: undefined,
  onChange: undefined,
  onSave: undefined,
  onDelete: undefined,
  disabled: false,
};

export default SectionEditor;
