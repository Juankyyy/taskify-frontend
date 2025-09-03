import { useEffect, useRef } from 'react';

export const useDisableAnimation = (className, delay = 1000) => {
  const containerRef = useRef(null);
  const elementsRef = useRef(new Set());

  useEffect(() => {
    // Limpiar clases previas solo en el contenedor actual
    elementsRef.current.forEach(element => {
      if (element && element.parentNode) {
        element.classList.remove('animation-disabled');
      }
    });
    elementsRef.current.clear();

    const timer = setTimeout(() => {
      if (containerRef.current) {
        // Buscar elementos dentro del contenedor
        const elementsInside = containerRef.current.querySelectorAll(`.${className}`);
        
        // También verificar si el propio contenedor tiene la clase
        const elementsToProcess = [];
        
        if (containerRef.current.classList.contains(className)) {
          elementsToProcess.push(containerRef.current);
        }
        
        elementsInside.forEach(element => {
          elementsToProcess.push(element);
        });

        elementsToProcess.forEach(element => {
          element.classList.add('animation-disabled');
          elementsRef.current.add(element);
        });
      }
    }, delay);

    return () => {
      clearTimeout(timer);
      elementsRef.current.forEach(element => {
        if (element && element.parentNode) {
          element.classList.remove('animation-disabled');
        }
      });
      elementsRef.current.clear();
    };
  }, [className, delay]);

  return containerRef;
};