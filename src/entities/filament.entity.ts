import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectId } from "mongodb";
import { Color } from "./color.entity";
import { FilamentToPrintLog } from "./filament_printlog.entity";

@Entity()
export class Filament {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    nullable: false,
  })
  name: string;

  @Column()
  material: string;

  @Column()
  diameter: number;

  @Column()
  color_id: ObjectId;

  @Column()
  brand: string;

  @Column()
  url: string;

  @Column()
  amount: number;

  @Column()
  totalAmount: number;

  @OneToMany(
    () => FilamentToPrintLog,
    (filamentToPrintLog) => filamentToPrintLog.filament
  )
  public filamentToPrintLog: FilamentToPrintLog[];
}
