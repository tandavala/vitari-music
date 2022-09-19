import { Request, Response } from "express";

export abstract class BaseController {
  protected req: Request;
  protected res: Response;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: Request, res: Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }
  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(
      this.res,
      400,
      message ?? "Unauthorized"
    );
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(
      this.res,
      401,
      message ?? "Unauthorized"
    );
  }

  public paymentRequired(message?: string) {
    return BaseController.jsonResponse(
      this.res,
      402,
      message ?? "Payment required"
    );
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(
      this.res,
      403,
      message ?? "Unauthorized"
    );
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(this.res, 404, message ?? "Not Found");
  }

  public conflict(message?: string) {
    return BaseController.jsonResponse(this.res, 409, message ?? "Conflict");
  }
  public tooMany(message?: string) {
    return BaseController.jsonResponse(
      this.res,
      429,
      message ?? "Too many request"
    );
  }

  public todo() {
    return BaseController.jsonResponse(this.res, 400, "TODO");
  }

  public fail(error) {
    console.log(error);
    return this.res.status(500).json({ message: error });
  }
}
