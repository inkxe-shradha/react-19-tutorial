import { createContext, useContext } from 'react';

export const JwtAuthContext = createContext(null);

export function useJwtAuth() {
  const context = useContext(JwtAuthContext);
  if (!context)
    throw new Error('useJwtAuth must be used inside JwtAuthProvider.');
  return context;
}
