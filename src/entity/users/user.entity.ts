import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import "reflect-metadata";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name?: string;

  @Column()
  public email?: string;

  @Column()
  public password?: string;
}

export default User;
