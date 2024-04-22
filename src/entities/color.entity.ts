import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ObjectIdColumn,
} from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Color {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  hex: string;
}
