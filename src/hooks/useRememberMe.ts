import { useState, useEffect } from 'react';

const REMEMBER_ME_KEY = 'educasem_remember_me';
const SAVED_EMAIL_KEY = 'educasem_saved_email';

interface UseRememberMeReturn {
  rememberMe: boolean;
  savedEmail: string;
  toggleRememberMe: () => void;
  saveEmail: (email: string) => void;
  clearSavedData: () => void;
}

/**
 * Hook personalizado para manejar la funcionalidad "Recordarme"
 * Guarda el email del usuario en localStorage si está habilitado
 */
export function useRememberMe(): UseRememberMeReturn {
  const [rememberMe, setRememberMe] = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  // Cargar datos guardados al montar el componente
  useEffect(() => {
    try {
      const savedRememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true';
      const savedEmailValue = localStorage.getItem(SAVED_EMAIL_KEY) || '';
      
      setRememberMe(savedRememberMe);
      setSavedEmail(savedEmailValue);
    } catch (error) {
      console.error('Error loading remember me data:', error);
    }
  }, []);

  const toggleRememberMe = () => {
    const newValue = !rememberMe;
    setRememberMe(newValue);
    
    try {
      localStorage.setItem(REMEMBER_ME_KEY, String(newValue));
      
      // Si se desactiva "recordarme", limpiar el email guardado
      if (!newValue) {
        localStorage.removeItem(SAVED_EMAIL_KEY);
        setSavedEmail('');
      }
    } catch (error) {
      console.error('Error saving remember me preference:', error);
    }
  };

  const saveEmail = (email: string) => {
    if (rememberMe && email.trim()) {
      try {
        localStorage.setItem(SAVED_EMAIL_KEY, email.trim());
        setSavedEmail(email.trim());
      } catch (error) {
        console.error('Error saving email:', error);
      }
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem(REMEMBER_ME_KEY);
      localStorage.removeItem(SAVED_EMAIL_KEY);
      setRememberMe(false);
      setSavedEmail('');
    } catch (error) {
      console.error('Error clearing saved data:', error);
    }
  };

  return {
    rememberMe,
    savedEmail,
    toggleRememberMe,
    saveEmail,
    clearSavedData,
  };
}