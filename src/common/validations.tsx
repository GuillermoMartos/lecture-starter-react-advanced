const FORM_VALIDATORS = {
  email: (value: string) => /\S+@\S+\.\S+/.test(value)
    ? null :
    'Please enter a valid email address.',
  password: (value: string) => (value.length < 3 || value.length > 20)
    ? 'Password must be between 3 and 20 characters long.' :
    null,
  fullName: (value: string) => value.trim() === ''
    ? 'Full name is required.'
    : null
};

export default FORM_VALIDATORS;