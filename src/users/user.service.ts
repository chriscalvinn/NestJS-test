import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { userModel } from  './user.model';
import { InjectRepository } from "@nestjs/typeorm";
import { clientdata } from "./entity/user.entity";
import { Repository, Connection } from "typeorm";
import * as bcrypt from 'bcrypt'

@Injectable()
export class userService{

    constructor(
        @InjectRepository(clientdata) private userRepository: Repository<clientdata>,
        private connection: Connection
    ) {}
    private users: userModel[] = [];
/*
    getUserById(id: number){
        const userlist = this.users.find(oneUser => oneUser.userID == id);
        if (!userlist){
            throw new NotFoundException('no existing user');
        }
        return { ...userlist };
    }

    updateUser(id: number, value: string){
        const index = this.users.findIndex(oneUser => oneUser.userID == id);
        if (!index){
            throw new NotFoundException('user not found');
        }
        try{
            this.users[index].user = value;
            return this.users[index];
        } catch {
            throw new NotImplementedException('not updated');
        }
        
    }
*/
async registerUser(uname: string, password: string): Promise<any>{
    // asumsi tidak ada data user diupload 2 kali
        const data = uname+password;
        let newUser = new clientdata();
        
        let existing = await this.findByUname(uname);
        if (existing){
            console.log('user exsisted. name: '+existing.username);
            return ({'status code': 501,'message': 'Not Implemented. user exsisted.'});
        } else {
            console.log('valid')
        }

        newUser.username = await this.hashData(uname);
        newUser.userdata = await this.hashData(data);

        await this.connection.transaction(async manager => {
            await manager.save(newUser);
            console.log(newUser);
            
        })
        return newUser;
    }

    async findAll(): Promise<clientdata[]>{
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<clientdata>{
        const val = await this.userRepository.findOne(id);
        if (!val){
            return null;
        }
        return val;
    }

    async findByUname(uname: string): Promise<clientdata>{
        const val = await this.findAll();
        let existing = new clientdata();
        existing = null;
        for (let user of val){
            const match = await bcrypt.compare(uname, user.username);
            if (match){
                existing = user;
                break;
            }
        };
        return existing;
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async hashData(data: string): Promise<string>{
        const salt = await bcrypt.genSaltSync(11)
        const hasheddata = await bcrypt.hash(data, salt).then(function(hash){
            return hash;
        })

        return hasheddata;
    }

}