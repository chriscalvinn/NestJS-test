import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { userModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [userModule, 
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "120199",
    database: "testDB",
    autoLoadEntities: true,
}), AuthModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
