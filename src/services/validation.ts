// import { toast } from 'react-toastify';

export const checkPassword = (password: string, confirmPassword: string) => {
  const validate = password === confirmPassword;
  if (validate) {
    return true;
  }
  // toast.error('Senhas não coincidem');
  return false;
};

export const validateEmail = (email: string) => {
  const re = /[\w'+-]+(\.[\w'+-]+)*@\w+([-.]\w+)*\.\w{2,24}/;
  return re.test(String(email).toLowerCase());
};
