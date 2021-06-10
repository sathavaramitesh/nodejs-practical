import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { Utils } from "../../helpers/utils";
import { AuthUtils } from "./authUtils";
import * as l10n from "jm-ez-l10n";
import { Jwt } from "../../helpers/jwt";
import { SendEmail } from "../../helpers/sendEmail";

export class AuthController {
  private authUtils: AuthUtils = new AuthUtils();

  public login = async (req: Request, res: Response) => {
    const { _user } = req;
    const userData: Json = {
      userId: _user.id,
      email: _user.email,
    };
    const token = Jwt.getAuthToken(userData);
    userData.token = token;
    userData.name = _user.name;
    const response = ResponseBuilder.data(userData, req.t("LOGIN_SUCCESS"));
    res.status(response.code).json(response);
  }

  public signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const newPassword = Utils.getEncryptedPassword(password);
    const userData = {
      email,
      password: newPassword,
      name
    };
    await this.authUtils.createUser(userData);
    // await this.sendWelcomeEmail(`welcome-email`, userData);
    const responseData = ResponseBuilder.data(req.t("ACCOUNT_CREATED"));
    res.status(responseData.code).json(responseData);
  }

  // public async sendWelcomeEmail(template: any, data: any) {
  //   await SendEmail.sendRawMail({
  //     template,
  //     replaceData: {
  //       "{USERNAME}": data.name
  //     },
  //     to: [`${data.email}`],
  //     subject: l10n.t("WELCOME_MAIL_SUBJECT"),
  //   });
  //   return;
  // }
}
