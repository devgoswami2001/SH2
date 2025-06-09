'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';

interface IntersectionOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options?: IntersectionOptions
): [RefObject<T>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const triggerOnce = options?.triggerOnce ?? true;

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    // Disconnect previous observer if it exists and we are re-observing
    if (observerRef.current) {
        observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            // Only set to false if not triggerOnce, to prevent hiding after first reveal
            setIsVisible(false);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? '0px',
        root: options?.root ?? null,
      }
    );

    observerRef.current.observe(currentElement);

    return () => {
      // Ensure observer and element still exist before trying to unobserve
      if (observerRef.current && currentElement) {
        observerRef.current.unobserve(currentElement);
      }
      // If not triggerOnce and component unmounts, disconnect fully.
      // If triggerOnce, the observer for this element is already stopped if it became visible.
      if (observerRef.current && (!triggerOnce || !isVisible)) {
        observerRef.current.disconnect();
      }
    };
  }, [options, triggerOnce, isVisible]); // isVisible is added to ensure cleanup logic for triggerOnce is robust

  return [elementRef, isVisible];
}
