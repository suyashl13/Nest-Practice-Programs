import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { Serialize } from "src/interceptors/serialize.interceptors";
import { UserDto } from "./dtos/user.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";
import { User } from "./user.entity";

@Controller("auth")
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}


  // @Get("/whoami")
  // whoAmI(@Session() session: any) {
  //   console.log(session)
  //   return this.userService.findOne(session.userId);
  // }

  @Get('whoami')
  whoAmI(@CurrentUser() user: User){
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email, body.password);
  }

  @Post("/signin")
  signin(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  @Get("/:id")
  async findUser(@Param("id") id: string) {
    const intId = Number.parseInt(id);
    const user = await this.userService.findOne(intId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  @Get()
  async findAllUsers(@Query("email") email: string) {
    return await this.userService.find(email);
  }

  @Delete("/:id")
  async removeUser(@Param("id") id: string) {
    const intId = Number.parseInt(id);
    return await this.userService.remove(intId);
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(Number.parseInt(id), body);
  }
}
