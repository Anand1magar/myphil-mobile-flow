/**
 * @startingPoint section="Components" subtitle="Expandable cost line-item summary" viewport="700x260"
 */
export interface PriceBreakdownItem { label: string; value: string | number; }
export interface PriceBreakdownProps {
  items: PriceBreakdownItem[];
  total: string | number;
}
