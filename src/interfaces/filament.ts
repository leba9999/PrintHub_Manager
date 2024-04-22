import { Color } from "./color";

interface Filament {
  id?: string;
  name?: string;
  material?: string;
  diameter?: number;
  brand?: string;
  url?: string;
  amount?: number;
  totalAmount?: number;
  color?: Color;
}
export { Filament };
