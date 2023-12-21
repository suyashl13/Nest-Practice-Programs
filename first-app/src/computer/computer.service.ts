import { Injectable } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class ComputerService {
    constructor (
       private powerService: PowerService,
       private cpuService: CpuService
    ) {}

    public compute(): number  {
        this.powerService.supplyPower(20);
        return this.cpuService.compute(10, 10);
    }

}
