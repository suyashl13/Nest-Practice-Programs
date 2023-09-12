import { Injectable } from "@nestjs/common";
import { NotesRepository } from "./notes.repository";

@Injectable()
export class NotesService {
    constructor(public notesRepo: NotesRepository){}

    async create(note: string) {
        return this.notesRepo.create(note);
    }

    async update(id: string, note: string){
        return this.notesRepo.update(id, note);
    }

    async delete (id: string) {
        return this.notesRepo.delete(id);
    }

    async getAll(){
        return this.notesRepo.findAll();
    }

    async findOne(id: string) {
        return this.notesRepo.findOne(id);
    }

}