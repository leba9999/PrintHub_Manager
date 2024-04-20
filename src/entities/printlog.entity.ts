import {
  Column,
  Entity,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FilamentToPrintLog } from "./filament_printlog.entity";

@Entity()
export class PrintLog {
  @ObjectIdColumn()
  id: number;

  @Column()
  client: string;

  @Column()
  layerHeight: number;

  @Column()
  duration: number;

  @OneToMany(
    () => FilamentToPrintLog,
    (filamentToPrintLog) => filamentToPrintLog.printLog
  )
  public filamentToPrintLog: FilamentToPrintLog[];
}
