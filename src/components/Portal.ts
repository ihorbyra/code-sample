import { useEffect } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: { children: JSX.Element[] | JSX.Element }): React.ReactPortal => {
  const mount = document.getElementById('portals') as HTMLElement;
  const el: HTMLElement = document.createElement('div');

  useEffect(() => {
    mount.appendChild(el);
    return () => {
      mount.removeChild(el);
    };
  }, [el, mount]);

  return createPortal(children, el);
};
