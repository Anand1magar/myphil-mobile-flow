export interface InputMyPhilProps {
  label?: string;
  /** @default "text-left" */
  property?: 'text-left' | 'text-right';
  /** @default "idle" */
  status?: 'idle' | 'filled' | 'error';
  value?: string;
}
