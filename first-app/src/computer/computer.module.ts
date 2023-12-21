import { Module } from '@nestjs/common';
import { CpuModule } from '../cpu/cpu.module';
import { DiscModule } from 'src/disc/disc.module';
import { ComputerController } from './computer.controller';

@Module({
  imports: [CpuModule, DiscModule],
  controllers: [ComputerController],
})
export class ComputerModule {}
 