import { Controller, Get } from '@nestjs/common';
import { CpuService } from '../cpu/cpu.service';
import { DiskService } from '../disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  run() {
    const result1 = this.cpuService.compute(1, 2);
    const result2 = this.diskService.getData();
    return [result1, result2];
  }
}
