export interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Estado del formulario de login
export interface LoginFormState {
  email: string;
  password: string;
  errors: LoginErrors;
  isSubmitting: boolean;
}