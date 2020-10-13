import {Column, Entity, PrimaryColumn, Timestamp} from "typeorm";

@Entity({
  schema: 'public',
  name: 'tb_measurements',
  withoutRowid: true
})
export class MeasurementEntity {
  @PrimaryColumn({
    type: "varchar"
  })
  id: string;

  @Column({
    type: "timestamp"
  })
  timestamp: Date;

  @Column({
    type: 'varchar',
    nullable: false
  })
  origin: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  url: string;

  @Column({
    type: 'float4',
    nullable: false
  })
  domLoad: number;

  @Column({
    type: 'float4',
    nullable: false
  })
  firstContentfulPaint: number;

  @Column({
    type: 'float4',
    nullable: false
  })
  timeToFirstByte: number;

  @Column({
    type: 'float4',
    nullable: false
  })
  windowLoad: number;

  @Column({
    type: 'jsonb',
    nullable: false
  })
  resourceLoads: object;
}