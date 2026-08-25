export interface ButtonProps {
  /** Visual hierarchy. @default "primary" */
  hierarchy?: 'primary' | 'secondary' | 'tertiary' | 'link';
  /** @default "md" */
  size?: 'sm' | 'md' | 'block';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}
