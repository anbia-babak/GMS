// Login logic (front-end only). Replace loginRequest with your own backend call later.
export const initialLoginForm = { email: "example@gmail.com", password: "123456", remember: false };

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = "Email is required.";
  else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!password) errors.password = "Password is required.";
  else if (password.length < 6) errors.password = "Password must be at least 6 characters.";
  return errors;
}

// Placeholder: simulates a request. Connect your real backend here.
export function loginRequest(form) {
  return new Promise((resolve) => setTimeout(() => resolve({ ok: true, email: form.email }), 800));
}