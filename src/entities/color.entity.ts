import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Filament } from "./filament.entity";

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @OneToMany(() => Filament, (filament) => filament.color)
  filaments: Filament[];
}
