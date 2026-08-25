export interface PhilScreenProps {
  /** Source breakpoints: mobile 320, tablet 600, desktop 1200. @default "mobile" */
  size?: 'mobile' | 'tablet' | 'desktop';
  children?: React.ReactNode;
}
