export interface SearchBarProps {
  label?: string;
  placeholder?: string;
  /** @default "left" */
  iconSide?: 'left' | 'right';
  value?: string;
  onChange?: (e: any) => void;
}
