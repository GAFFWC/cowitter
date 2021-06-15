import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const JsonHeaders = createParamDecorator((property: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    if (!(req.headers && req.headers[property])) {
        throw new InternalServerErrorException(`${property} of req.headers not defined`);
    }

    try {
        return JSON.parse(req.headers[property]);
    } catch (err) {
        console.error(err);
        throw new InternalServerErrorException(`${property} of req.headers is not a json string`);
    }
});
