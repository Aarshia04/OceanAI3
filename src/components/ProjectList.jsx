import React from "react";
import PropTypes from "prop-types";

function ProjectList({ projects, activeProjectId, onSelect, onDelete, onCreate }) {
  return (
    <div className="project-list">
      <div className="project-list__header">
        <h2>Projects</h2>
        <button type="button" onClick={onCreate} className="primary">
          New Project
        </button>
      </div>

      {projects.length === 0 && <p>No projects yet. Create your first project.</p>}

      <ul>
        {projects.map((project) => (
          <li key={project.id} className={project.id === activeProjectId ? "active" : ""}>
            <button type="button" onClick={() => onSelect?.(project.id)}>
              <div className="project-list__name">{project.name}</div>
              <div className="project-list__meta">
                <span>{project.description}</span>
                {project.updatedAt && <time dateTime={project.updatedAt}>{project.updatedAt}</time>}
              </div>
            </button>
            <div className="project-list__actions">
              <button type="button" onClick={() => onDelete?.(project.id)} aria-label="Delete project">
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      updatedAt: PropTypes.string,
    })
  ),
  activeProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  onCreate: PropTypes.func,
};

ProjectList.defaultProps = {
  projects: [],
  activeProjectId: undefined,
  onSelect: undefined,
  onDelete: undefined,
  onCreate: undefined,
};

export default ProjectList;
