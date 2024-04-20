import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ObjectIdColumn,
} from "typeorm";
import { Filament } from "./filament.entity";

@Entity()
export class Color {
  @ObjectIdColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Filament, (filament) => filament.color)
  filaments: Filament[];
}
