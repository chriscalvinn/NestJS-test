import { Module } from "@nestjs/common";
import { userController } from "./user.controller";
import { userService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { clientdata } from "./entity/user.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([clientdata])],
    controllers: [userController],
    providers: [userService],
})
export class userModule{}