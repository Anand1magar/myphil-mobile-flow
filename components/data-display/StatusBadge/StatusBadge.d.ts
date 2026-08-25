export interface StatusBadgeProps {
  /** @default "pending" */
  status?: 'in-progress' | 'complete' | 'action-needed' | 'pending';
  children?: React.ReactNode;
}
