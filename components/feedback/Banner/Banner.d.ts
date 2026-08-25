export interface BannerProps {
  /** @default "info" */
  tone?: 'info' | 'danger' | 'warning' | 'success';
  title: string;
  children?: React.ReactNode;
  onClose?: () => void;
}
