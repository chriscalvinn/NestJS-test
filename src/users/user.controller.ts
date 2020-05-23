import { Controller, Post, Body, Get, Param, Put, UseGuards } from "@nestjs/common";
import { userService } from "./user.service";
import { userInfo } from "os";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('users')
export class userController{
    constructor(private readonly userService: userService){}

    @Post()
    async addUser(@Body() body: {username: string, user: string}){
        return await this.userService.registerUser(body.username, body.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllfromdbase(){
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserById(@Param('id') id: number){
        return this.userService.findById(id);
    }

    /*
    @Put()
    updateUser(@Body() body: {userID: number, user: string}){
        return this.userService.updateUser(body.userID, body.user);
    }
    */
}