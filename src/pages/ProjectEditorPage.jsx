import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectSections from '../components/ProjectSections.jsx';
import { exportProject, fetchProject, updateProject } from '../api/projects.js';

const defaultSlides = [
  { id: 'intro', title: 'Introduction', status: 'In progress', content: 'Set the stage for the project narrative.' },
  { id: 'problem', title: 'Problem', status: 'Ready', content: 'Describe the user pain point with evidence.' },
  { id: 'solution', title: 'Solution', status: 'Draft', content: 'Explain the proposed solution and differentiators.' },
  { id: 'impact', title: 'Impact', status: 'Draft', content: 'Highlight expected outcomes and metrics.' }
];

const ProjectEditorPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({ id: projectId, title: 'Project', slides: defaultSlides });
  const [activeSlideId, setActiveSlideId] = useState(defaultSlides[0].id);
  const [refinement, setRefinement] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProject(projectId);
        setProject({
          id: data.id,
          title: data.title,
          slides: data.slides?.length ? data.slides : defaultSlides
        });
        setActiveSlideId(data.slides?.[0]?.id || defaultSlides[0].id);
      } catch (err) {
        setStatus('Loaded offline demo content.');
      }
    };

    loadProject();
  }, [projectId]);

  const activeSlide = useMemo(
    () => project.slides.find((slide) => slide.id === activeSlideId) || project.slides[0],
    [project.slides, activeSlideId]
  );

  const handleSave = async () => {
    try {
      setStatus('Saving...');
      const slides = project.slides.map((slide) =>
        slide.id === activeSlide.id ? { ...slide, content: activeSlide.content } : slide
      );
      await updateProject(project.id, { slides });
      setProject({ ...project, slides });
      setStatus('Saved');
    } catch (err) {
      setStatus('Save failed.');
    }
  };

  const handleRefine = () => {
    setStatus(refinement ? 'Refinement submitted to FastAPI.' : 'Enter refinement instructions.');
  };

  const handleFeedback = (type) => {
    setStatus(type === 'like' ? 'Appreciated the slide.' : 'Recorded dislike.');
  };

  const handleExport = async () => {
    try {
      setStatus('Exporting...');
      await exportProject(project.id);
      setStatus('Export requested. Check your downloads soon.');
    } catch (err) {
      setStatus('Export failed.');
    }
  };

  return (
    <div className="app-shell" style={{ minHeight: 'auto' }}>
      <aside className="sidebar">
        <h3 style={{ marginTop: 0 }}>{project.title || 'Project'}</h3>
        <ProjectSections
          sections={project.slides}
          activeId={activeSlideId}
          onSelect={setActiveSlideId}
        />
        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
          {status || 'Select a section to edit'}
        </div>
      </aside>
      <main className="content">
        <div className="page-header">
          <div>
            <h1>{activeSlide?.title}</h1>
            <p>Use refinements and feedback to tune the generated content.</p>
          </div>
          <div className="button-row">
            <button className="button" type="button" onClick={() => handleFeedback('dislike')}>
              Dislike
            </button>
            <button className="button" type="button" onClick={() => handleFeedback('like')}>
              Like
            </button>
            <button className="button primary" type="button" onClick={handleExport}>
              Export
            </button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3>Slide content</h3>
          <textarea
            className="textarea"
            value={activeSlide?.content || ''}
            onChange={(event) =>
              setProject((current) => ({
                ...current,
                slides: current.slides.map((slide) =>
                  slide.id === activeSlide.id ? { ...slide, content: event.target.value } : slide
                )
              }))
            }
          />
          <div className="button-row" style={{ marginTop: '0.75rem' }}>
            <button className="button primary" type="button" onClick={handleSave}>
              Save
            </button>
            <button className="button neutral" type="button" onClick={() => setStatus('Reset changes')}>
              Reset
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Refinement</h3>
          <p style={{ marginTop: 0 }}>
            Provide targeted guidance for FastAPI to improve this section.
          </p>
          <input
            className="input"
            placeholder="Ask for tone, structure, or emphasis adjustments"
            value={refinement}
            onChange={(event) => setRefinement(event.target.value)}
          />
          <div className="button-row" style={{ marginTop: '0.75rem' }}>
            <button className="button primary" type="button" onClick={handleRefine}>
              Send refinement
            </button>
            <button className="button" type="button" onClick={() => setRefinement('')}>
              Clear
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectEditorPage;
