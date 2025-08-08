export interface Holding {
  symbol: string;
  purchasePrice: number;
  qty: number;
  sector: string;
}

export interface HoldingWithLive extends Holding {
  cmp: number;
  pe: number | null;
  earnings: string | null;
}
