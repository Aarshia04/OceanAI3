import React, { useState } from "react";
import PropTypes from "prop-types";

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterForm({ onSubmit, disabled }) {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      return;
    }

    onSubmit?.({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  const handleClear = () => setForm(initialFormState);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
          disabled={disabled}
        />
      </div>

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
          autoComplete="new-password"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          disabled={disabled}
        />
        {form.password !== form.confirmPassword && (
          <p className="form-hint">Passwords must match</p>
        )}
      </div>

      <div className="actions">
        <button type="submit" disabled={disabled}>
          Create Account
        </button>
        <button type="button" onClick={handleClear} disabled={disabled}>
          Clear
        </button>
      </div>
    </form>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
};

RegisterForm.defaultProps = {
  onSubmit: undefined,
  disabled: false,
};

export default RegisterForm;
