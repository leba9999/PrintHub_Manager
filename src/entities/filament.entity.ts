import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Color } from "./color.entity";
import { FilamentToPrintLog } from "./filament_printlog.entity";

@Entity()
export class Filament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  material: string;

  @Column()
  diameter: number;

  @Column()
  brand: string;

  @Column()
  url: string;

  @Column()
  amount: number;

  @Column()
  totalAmount: number;

  @ManyToOne(() => Color, (color) => color.filaments)
  color: Color;

  @OneToMany(
    () => FilamentToPrintLog,
    (filamentToPrintLog) => filamentToPrintLog.filament
  )
  public filamentToPrintLog: FilamentToPrintLog[];
}
