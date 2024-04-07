import { Injectable, NotFoundException } from '@nestjs/common';
import { Tuit } from './tuit.entity';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TuitsService {
    constructor(@InjectRepository(Tuit) private readonly tuitRepository: Repository<Tuit>) {}

    async getTuits(): Promise<Tuit[]> {
        return await this.tuitRepository.find({ relations: ['user'] });
    }

    async getTuit(id: number): Promise<Tuit> {
        const tuit: Tuit = await this.tuitRepository.findOneById(id);

        if (!tuit) {
            throw new Error('Tuit not found');
        }

        return tuit;
    }

    async createTuit({message}: CreateTuitDto) {
        const tuit: Tuit = this.tuitRepository.create({message});

        return this.tuitRepository.save(tuit);
    }

    async updateTuit(id: number, {message}: UpdateTuitDto) {
        const tuit: Tuit = await this.tuitRepository.preload({
            id,
            message,
        });

        if (!tuit) {
            throw new NotFoundException('tuit not found')
        }
        
        return tuit;
    }

    async removeTuit(id: number): Promise<void> {
        const tuit: Tuit = await this.tuitRepository.findOneById(id);

        if (!tuit) {
            throw new NotFoundException('tuit not found');
        }

        this.tuitRepository.remove(tuit);
    }

}
