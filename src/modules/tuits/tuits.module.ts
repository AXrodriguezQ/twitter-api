import { Module } from '@nestjs/common';
import { TuitsController } from './tuits.controller';
import { TuitsService } from './tuits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './tuit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tuit])],
    controllers: [TuitsController],
    providers: [TuitsService],
})
export class TuitsModule {}
