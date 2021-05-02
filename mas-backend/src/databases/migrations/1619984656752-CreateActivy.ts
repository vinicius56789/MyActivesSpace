import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateActivy1619984656752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "activys",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "course_unit",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "activy_date",
                        type: "date"
                    },
                    {
                        name: "create_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )

        const foreignKey = new TableForeignKey({
            columnNames: ["course_unit"],
            referencedColumnNames: ["id"],
            referencedTableName: "courseunit",
            onDelete: "CASCADE"
        });
        await queryRunner.createForeignKey("activys", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("activys")
    }

}
