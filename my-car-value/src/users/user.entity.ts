import { Exclude } from "class-transformer";
import { Entity,  Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;


    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log("Inserted an object with id "+ this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated an object with id "+ this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log("Removed an object with id "+ this.id);
    }
}