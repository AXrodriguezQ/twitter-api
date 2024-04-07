import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TuitsService } from './tuits.service';
import { Tuit } from './tuit.entity';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { UpdateTuitDto } from './dto/update-tuit.dto';

@Controller('tuits')
export class TuitsController {
    constructor( private readonly tuitsService: TuitsService) {}
    @Get()
    getTuits(@Query() filterQuery): Promise<Tuit[]> {
        const { searchTerm, orderBy } = filterQuery;

        return this.tuitsService.getTuits();
    }
    @Get('/:id')
    getTuit(@Param('id') id: number): Promise<Tuit> {
        const tuit = this.tuitsService.getTuit(id);

        if (!tuit) {
            throw new NotFoundException('Resource not found');
        }

        return tuit;
    }
    @Post()
    // ? Cambio de codigo de estado -->@HttpCode(HttpStatus.CONFLICT)
    @HttpCode(HttpStatus.CREATED)
    createTuit(@Body() message: CreateTuitDto): Promise<Tuit> {
        return this.tuitsService.createTuit(message);
    }
    @Patch(':id')
    updateTuit(@Param('id') id: number, @Body() tuit: UpdateTuitDto): Promise<Tuit> {
        return this.tuitsService.updateTuit(id, tuit);
    }
    @Delete(':id')
    deleteTuit(@Param('id') id: number): Promise<void> {
        return this.tuitsService.removeTuit(id);
    }
}
