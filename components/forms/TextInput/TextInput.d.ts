export interface TextInputProps {
  label?: string;
  placeholder?: string;
  /** @default "default" */
  state?: 'default' | 'focused' | 'error' | 'verified' | 'filled';
  helperText?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: any) => void;
  type?: string;
}
