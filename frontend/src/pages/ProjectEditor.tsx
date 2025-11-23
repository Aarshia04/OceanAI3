import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import generationService from '../services/generationService';
import projectService from '../services/projectService';

function ProjectEditor() {
  const { id } = useParams();
  const [project, setProject] = useState<any>();
  const [prompt, setPrompt] = useState('');
  const [section, setSection] = useState('Section 1');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      projectService.get(Number(id)).then(setProject);
    }
  }, [id]);

  const handleGenerate = async () => {
    if (!id) return;
    const result = await generationService.generate(Number(id), prompt);
    setContent(result.content);
  };

  const handleRefine = async () => {
    if (!id) return;
    const result = await generationService.refine(Number(id), section, prompt);
    setContent(result.result);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{project?.name || 'Project Editor'}</h2>
        <div>
          <label>Sections</label>
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option>Section 1</option>
            <option>Section 2</option>
            <option>Section 3</option>
          </select>
        </div>
        <div>
          <label>Prompt</label>
          <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        </div>
        <div>
          <button className="button" onClick={handleGenerate}>Generate</button>
          <button className="button secondary" onClick={handleRefine}>Refine</button>
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <button className="button">Export</button>
          <button className="button secondary">👍</button>
          <button className="button secondary">👎</button>
        </div>
      </div>
    </div>
  );
}

export default ProjectEditor;
