import React from "react";
import PropTypes from "prop-types";

function RefinementControls({
  iterations,
  temperature,
  autoRefine,
  onChange,
  onRun,
  disabled,
}) {
  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    const nextValue = type === "checkbox" ? checked : Number(value);
    onChange?.({ [name]: nextValue });
  };

  return (
    <div className="refinement-controls">
      <div className="field">
        <label htmlFor="iterations">Iterations</label>
        <input
          id="iterations"
          name="iterations"
          type="number"
          min={1}
          max={10}
          value={iterations}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="temperature">Creativity</label>
        <input
          id="temperature"
          name="temperature"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={temperature}
          onChange={handleChange}
          disabled={disabled}
        />
        <div className="hint">Higher values encourage more variation.</div>
      </div>

      <div className="field checkbox">
        <label htmlFor="autoRefine">
          <input
            id="autoRefine"
            name="autoRefine"
            type="checkbox"
            checked={autoRefine}
            onChange={handleChange}
            disabled={disabled}
          />
          Auto-refine after updates
        </label>
      </div>

      <div className="actions">
        <button type="button" onClick={onRun} disabled={disabled}>
          Run Refinement
        </button>
      </div>
    </div>
  );
}

RefinementControls.propTypes = {
  iterations: PropTypes.number,
  temperature: PropTypes.number,
  autoRefine: PropTypes.bool,
  onChange: PropTypes.func,
  onRun: PropTypes.func,
  disabled: PropTypes.bool,
};

RefinementControls.defaultProps = {
  iterations: 1,
  temperature: 0.3,
  autoRefine: false,
  onChange: undefined,
  onRun: undefined,
  disabled: false,
};

export default RefinementControls;
