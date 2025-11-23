import React, { useState } from "react";
import PropTypes from "prop-types";

const initialFormState = {
  email: "",
  password: "",
};

function LoginForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  const handleClear = () => setForm(initialFormState);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          disabled={disabled}
        />
      </div>

      <div className="actions">
        <button type="submit" disabled={disabled}>
          Sign In
        </button>
        <button type="button" onClick={handleClear} disabled={disabled}>
          Clear
        </button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

LoginForm.defaultProps = {
  onSubmit: undefined,
  disabled: false,
};

export default LoginForm;
