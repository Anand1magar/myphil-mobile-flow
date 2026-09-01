import { useState } from 'react';

// Shared focus-ring behavior for design-system input fields.
// While a field is focused (user is entering a value) its wrapper shows a
// 2px --sky ring; otherwise it keeps its resting 1px ring.
export function useFocusRing() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}

// Box-shadow for an input wrapper: 2px --sky when focused, else `restingRing`
// (pass the color, or a full box-shadow string for insets/multi-layer rings).
export function fieldRing(focused, restingRing = 'var(--pitch)') {
  if (focused) return '0 0 0 2px var(--sky)';
  return restingRing.includes(' ') ? restingRing : `0 0 0 1px ${restingRing}`;
}
