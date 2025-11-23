import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../api/projects.js';

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err?.response?.data?.detail || 'Unable to load projects.');
        setProjects([
          {
            id: 'demo-1',
            name: 'Product Launch Narrative',
            updatedAt: '2024-03-18'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Track and refine your presentation projects.</p>
        </div>
        <button className="button primary" type="button">
          New Project
        </button>
      </div>
      {loading && <p>Loading projects...</p>}
      {error && (
        <p style={{ color: '#dc2626' }}>
          {error}
        </p>
      )}
      <div className="card">
        <h3>Projects</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.map((project) => (
            <li key={project.id} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <strong>{project.name}</strong>
                  <div style={{ color: '#475569' }}>Updated {project.updatedAt}</div>
                </div>
                <Link className="button" to={`/project/${project.id}`}>
                  Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DashboardPage;
