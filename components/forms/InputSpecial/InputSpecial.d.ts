export interface InputSpecialProps {
  label?: string;
  /** @default 6 */
  length?: number;
  /** @default "default" */
  state?: 'default' | 'error' | 'verified' | 'filled';
}
