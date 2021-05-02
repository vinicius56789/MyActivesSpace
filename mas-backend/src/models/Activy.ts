import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn} from 'typeorm'
import {v4 as uuid} from 'uuid'
import {CourseUnit} from './CourseUnit'

@Entity("Activy")
class Activy {

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

    @PrimaryColumn()
    readonly id: string

    @ManyToOne(() => CourseUnit, course_unit => course_unit.activies)
    course_unit: CourseUnit

    @Column()
    name: String

    @Column()
    activy_date: Date

    @CreateDateColumn()
    create_at: Date
}

export {Activy}