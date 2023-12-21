import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";


@Injectable() 
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {}
    
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const userId = request.session.userId || {} ;
        console.log(userId)
        if (userId) {
            const user = await this.userService.findOne(userId) || 'sss';
            console.log(user);
            request.currentUser = user;
        }

        return next.handle();
    }
    
}