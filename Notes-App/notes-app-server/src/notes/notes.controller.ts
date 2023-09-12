import { Body, Controller, Get, Param, Post, NotFoundException, Delete, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';

@Controller()
export class NotesController {

    constructor(public notesService: NotesService) {}

    @Get()
    async getAllNotes() {
        return this.notesService.getAll();
    }

    @Post()
    async createNewNote(@Body() newNote: CreateNoteDto) {
        return this.notesService.create(newNote.note);
    }

    @Delete('/:id')
    async deleteNote(@Param('id') id: string) {
        return this.notesService.delete(id);
    }

    @Put('/:id')
    async updateNote(@Param('id') id: string, @Body() noteUpdate: CreateNoteDto){
        return this.notesService.update(id, noteUpdate.note);
    }

    @Get('/:id')
    async getNoteWithId(@Param('id') id: string) {
        const note =  await this.notesService.findOne(id);
        if (!note) {
            throw new NotFoundException("Not found note with id " + id);
        } else {
            return note;
        }
    }
}
