export interface ActionBoxProps {
  title?: string;
  /** @default "info" */
  tone?: 'info' | 'warning' | 'danger';
  children?: React.ReactNode;
  cta?: string;
}
