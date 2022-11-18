import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Topic {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public topic?: string;

  @Column({ array: true })
  public domain?: string;
}

export default Topic;
