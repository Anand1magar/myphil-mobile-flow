export interface MDDashButtonProps {
  /** @default "primary" */
  status?: 'primary' | 'secondary' | 'muted' | 'back' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg' | 'block';
  /** @default "idle" */
  state?: 'idle' | 'active' | 'disabled';
  children?: React.ReactNode;
}
