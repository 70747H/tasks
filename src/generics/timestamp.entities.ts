import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from "typeorm";

export class TimeStampEntity extends BaseEntity{
    @CreateDateColumn({ update: false })
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}