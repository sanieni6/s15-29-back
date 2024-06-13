import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (request.user) {
    console.log('request.user', request.user);
    
    return request.user;
  } else {
    return null;
  }
});
