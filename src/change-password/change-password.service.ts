import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class ChangePasswordService {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService
  ) {}

  public async changePassword(user: ChangePasswordDto): Promise<any> {
    this.sendMailChangePassword(user);

    return await this.usersService.updateByPassword(user.email, user.password);
  }

  private sendMailChangePassword(user): void {
    this.mailerService
      .sendMail({
        to: user.email,
        from: "from@example.com",
        subject: "Change Password successful ✔",
        text: "Change Password successful!",
        template: "index",
        context: {
          title: "Change Password successful!",
          description:
            "Change Password Successfully! ✔, This is your new password: " +
            user.password,
          nameUser: user.name,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Change Password: Send Mail successfully!");
      })
      .catch((err) => {
        console.log(err);
        console.log("Change Password: Send Mail Failed!");
      });
  }
}
