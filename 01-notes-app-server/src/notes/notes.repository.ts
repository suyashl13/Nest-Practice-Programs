import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises'
import { v4 } from 'uuid';

@Injectable()
export class NotesRepository {
    async findOne(id: string) {
        const data = await readFile('notes.json', 'utf-8');
        const encodedData: any[] = JSON.parse(data);

        const note = encodedData.filter((val) => val.id === id);
        if (note.length === 0) {
            return null;
        } else {
            return note[0];
        }
    }

    async findAll() {
        const data = await readFile('notes.json', 'utf-8');
        const encodedData: any[] = JSON.parse(data);

        return encodedData;
    }

    async create(note: string) {
        const data = await readFile('notes.json', 'utf-8');
        const encodedData: any[] = JSON.parse(data);

        const newNote = {
            id: v4(),
            note: note
        };
        encodedData.push(newNote);
        await writeFile('notes.json', JSON.stringify(encodedData));

        return newNote;
    }

    async update(id: String, note: string) {
        const data = await readFile('notes.json', 'utf-8');
        const encodedData: any[] = JSON.parse(data);
        let isUpdated: boolean = false;
        
        const update = encodedData.map((val) => {
            if (val.id === id) {
                val.note = note;
                isUpdated = true;
            }
            return val;
        })

        await writeFile('notes.json', JSON.stringify(update));

        if (isUpdated) {
            return update;
        } else {
            return null;
        }

    }

    async delete(id: string) {
        const data = await readFile('notes.json', 'utf-8');
        const encodedData: any[] = JSON.parse(data);
        
        const update = encodedData.filter((val) => val.id !== id);
        writeFile('notes.json', JSON.stringify(update));

        return update;
    }
}