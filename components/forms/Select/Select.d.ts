export interface SelectProps {
  label?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}
