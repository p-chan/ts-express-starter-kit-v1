import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1558720801414 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(254) CHARACTER SET \"utf8\" NOT NULL, `name` varchar(48) NOT NULL, `screen_name` varchar(24) NOT NULL, `hashed_password` varchar(60) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_ba9af88ac0003d40f4f7033e47` (`screen_name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `applications` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(48) NOT NULL, `client_id` varchar(64) NOT NULL, `client_secret` varchar(64) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `owner_user_id` int NULL, UNIQUE INDEX `IDX_19b187ccdbeb753c44a3a0be30` (`client_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `refresh_tokens` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(128) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `revoked_at` datetime NOT NULL, `user_id` int NULL, `client_id` int NULL, UNIQUE INDEX `IDX_4542dd2f38a61354a040ba9fd5` (`token`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `applications` ADD CONSTRAINT `FK_845748ec72fd8a6535a40648798` FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `refresh_tokens` ADD CONSTRAINT `FK_3ddc983c5f7bcf132fd8732c3f4` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `refresh_tokens` ADD CONSTRAINT `FK_795771f59bffe508b60827b01eb` FOREIGN KEY (`client_id`) REFERENCES `applications`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `FK_795771f59bffe508b60827b01eb`");
        await queryRunner.query("ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `FK_3ddc983c5f7bcf132fd8732c3f4`");
        await queryRunner.query("ALTER TABLE `applications` DROP FOREIGN KEY `FK_845748ec72fd8a6535a40648798`");
        await queryRunner.query("DROP INDEX `IDX_4542dd2f38a61354a040ba9fd5` ON `refresh_tokens`");
        await queryRunner.query("DROP TABLE `refresh_tokens`");
        await queryRunner.query("DROP INDEX `IDX_19b187ccdbeb753c44a3a0be30` ON `applications`");
        await queryRunner.query("DROP TABLE `applications`");
        await queryRunner.query("DROP INDEX `IDX_ba9af88ac0003d40f4f7033e47` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
