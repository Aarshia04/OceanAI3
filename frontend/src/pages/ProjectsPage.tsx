import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import projectService, { DocumentConfigPayload, Project, ProjectPayload } from '../services/projectService';
import { useAuth } from '../context/AuthContext';

function ProjectsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [documentType, setDocumentType] = useState<DocumentConfigPayload['doc_type']>('.docx');
  const [creating, setCreating] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await projectService.list();
      setProjects(data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        handleLogout();
        return;
      }
      const message = err?.response?.data?.detail || 'Unable to load projects.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    if (!name) return;

    setCreating(true);
    setError(null);
    try {
      await projectService.create({
        name,
        description: description || undefined,
        document_config: { doc_type: documentType, title: docTitle || undefined },
      });
      setName('');
      setDescription('');
      setDocTitle('');
      await fetchProjects();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        handleLogout();
        return;
      }
      const message = err?.response?.data?.detail || 'Could not create project.';
      setError(message);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>Projects</h1>
          <p className="muted">View and create your document projects.</p>
        </div>
        <button className="button secondary" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <section className="grid">
        <div className="card">
          <h2>Create Project</h2>
          <form className="form" onSubmit={handleCreate}>
            <label htmlFor="name">Project Name</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Quarterly Report"
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional summary"
              rows={2}
            />

            <label htmlFor="docTitle">Document Title</label>
            <input
              id="docTitle"
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="Title for generated document"
            />

            <label htmlFor="documentType">Document type</label>
            <select
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as DocumentConfigPayload['doc_type'])}
            >
              <option value=".docx">.docx</option>
              <option value=".pptx">.pptx</option>
            </select>

            <button className="button" type="submit" disabled={creating}>
              {creating ? 'Creating…' : 'Create project'}
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Your Projects</h2>
            <button className="button ghost" type="button" onClick={fetchProjects} disabled={loading}>
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="muted">Loading projects…</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : projects.length === 0 ? (
            <p className="muted">No projects yet. Create one to get started.</p>
          ) : (
            <ul className="project-list">
              {projects.map((project) => (
                <li key={project.id} className="project-item">
                  <div>
                    <p className="project-title">{project.name}</p>
                    <p className="muted small">
                      {project.document_config?.doc_type || 'N/A'}
                      {project.description ? ` • ${project.description}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
