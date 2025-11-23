import React from 'react';

const ProjectSections = ({ sections, activeId, onSelect }) => (
  <ul className="section-list">
    {sections.map((section) => (
      <li
        key={section.id}
        className={section.id === activeId ? 'active' : ''}
        onClick={() => onSelect(section.id)}
      >
        <div>{section.title}</div>
        <div className="tag">{section.status}</div>
      </li>
    ))}
  </ul>
);

export default ProjectSections;
