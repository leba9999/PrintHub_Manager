import { ObjectId } from "typeorm";
import { iColor } from "./color";

interface iFilament {
  id: string;
  name: string;
  material: string;
  diameter: number;
  brand: string;
  url: string;
  amount: number;
  totalAmount: number;
  color_id?: ObjectId;
}

interface iFilamentWithColor extends iFilament {
  color?: iColor;
}

export { iFilament, iFilamentWithColor };
