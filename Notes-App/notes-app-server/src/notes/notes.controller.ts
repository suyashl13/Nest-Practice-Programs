import { Controller, Get, Post } from '@nestjs/common';

@Controller('notes')
export class NotesController {
    @Get()
    async getAllNotes() {

    }

    @Post()
    async createNewNote() {

    }

    @Get('/:id')
    async getNoteWithId() {

    }
}
