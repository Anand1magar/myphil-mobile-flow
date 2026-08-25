export interface DropdownProps {
  items?: string[];
  /** @default true */
  searchable?: boolean;
  onSelect?: (item: string) => void;
}
