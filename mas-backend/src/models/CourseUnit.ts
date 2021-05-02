import {Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from 'typeorm'
import {v4 as uuid} from 'uuid'
import {Activy} from './Activy'

@Entity("CourseUnit")
class CourseUnit {

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

    @PrimaryColumn()
    readonly id: string

    @OneToMany(() => Activy, activy => activy.course_unit)
    activies: Activy[]

    @Column()
    name: String

    @Column()
    description: String

    @CreateDateColumn()
    creat_at: Date
}

export {CourseUnit}