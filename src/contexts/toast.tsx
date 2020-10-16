import React, { createContext, useCallback, useContext, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface IShowToastArgs {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

interface IToastProvider {
  showToast(args: IShowToastArgs): void;
}

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ToastContext = createContext<IToastProvider>({} as IToastProvider);

function useToast(): IToastProvider {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('ToastProvider não está acessível');
  }
  return context;
}

const ToastProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('info');

  const showToast = useCallback(({ type, message }) => {
    setOpen(true);
    setMessage(message);
    setType(type || 'info');
  }, []);

  const hideToast = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={hideToast}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert onClose={hideToast} severity={type || 'info'}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export { ToastProvider, useToast };
