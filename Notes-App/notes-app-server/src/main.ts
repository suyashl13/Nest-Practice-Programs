import { NestFactory } from '@nestjs/core';
import { NotesModule } from './notes/notes.module';

async function bootstrap() {
  const app = await NestFactory.create(NotesModule);
  await app.listen(3000);
}
bootstrap();
