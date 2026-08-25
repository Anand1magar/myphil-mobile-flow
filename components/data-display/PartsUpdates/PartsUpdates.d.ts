export interface PartsUpdatesProps {
  /** @default "shipped" */
  news?: 'shipped' | 'delivered' | 'issue' | 'pending';
  title?: string;
  time?: string;
}
