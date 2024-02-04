import React, {createContext, useContext, useEffect, useState} from 'react';

const ToastContext = createContext<ToastContextInterface | null>(null);

interface ToastInterface {
  type: 'success' | 'warn' | 'error';
  message: string;
}

interface ToastContextInterface {
  toast: ToastInterface;
  updateToast: (message, type) => void;
}

export const ToastProvider = ({children}) => {
  const [toast, setToast] = useState<ToastInterface | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const updateToast = (message, type) => {
    setToast({message, type});
  };

  return (
    <ToastContext.Provider
      value={{toast: toast as ToastInterface, updateToast}}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () =>
  useContext(ToastContext) as ToastContextInterface;
