import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Filament } from "./filament.entity";
import { PrintLog } from "./printlog.entity";

@Entity()
export class FilamentToPrintLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  used_g: number;

  @ManyToOne(() => Filament, (filament) => filament.filamentToPrintLog)
  filament: Filament;

  @ManyToOne(() => PrintLog, (printLog) => printLog.filamentToPrintLog)
  printLog: PrintLog;
}
