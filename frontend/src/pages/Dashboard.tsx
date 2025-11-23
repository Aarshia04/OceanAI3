import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../services/projectService';

function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    projectService.list().then(setProjects);
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
