import { useEffect, useRef, useState } from 'react';

function useInputFocus(initialState) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(initialState);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    inputRef.current.addEventListener('focus', handleFocus);
    inputRef.current.addEventListener('blur', handleBlur);

    return () => {
      inputRef.current.removeEventListener('focus', handleFocus);
      inputRef.current.removeEventListener('blur', handleBlur);
    };
  }, []);

  return [inputRef, isFocused];
}
