export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  /** @default "sm" */
  size?: 'sm' | 'md' | 'lg';
}
