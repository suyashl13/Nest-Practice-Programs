import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor (private powerModule: PowerService) {}

    compute(num1: number, num2: number){
        console.log("Drawing power of 10 Watts");
        this.powerModule.supplyPower(10);
        return num1 + num2;
    }
}
