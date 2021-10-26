import { ExecutionContext, createParamDecorator } from "@nestjs/common";

// Param decorators exist outside DI. 
// which means services cannot be used
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => { // any argument into the decorator is the data
        const req = context.switchToHttp().getRequest(); //context is basically the request
        return req.currentUser;
    }
)