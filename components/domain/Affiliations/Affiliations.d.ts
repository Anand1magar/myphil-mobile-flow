import { ReactNode } from 'react';

export interface AffiliationItem {
  name: string;
  category?: string;
  /** <img> src string, or a ReactNode to render in place of the wordmark */
  logo?: string | ReactNode;
}

export interface AffiliationsProps {
  title?: string;
  subtitle?: string;
  items?: AffiliationItem[];
}

export function Affiliations(props: AffiliationsProps): JSX.Element;
