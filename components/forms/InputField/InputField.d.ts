export interface InputFieldProps {
  /** Corner treatment when stacked in a group. @default "default" */
  position?: 'default' | 'top' | 'middle' | 'bottom';
  /** @default "default" */
  state?: 'default' | 'focus' | 'error' | 'verified' | 'filled';
  placeholder?: string;
}
