import React from 'react';
import { ToastProvider } from './toast';

const AppProviders: React.FC = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>;
};

export default AppProviders;
