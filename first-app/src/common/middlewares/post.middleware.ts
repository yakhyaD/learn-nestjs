import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class PostMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization && req.headers.authorization.trim() === "Bearer") {
            return next();
        }
        return res.status(401).send("Unauthorized");
    }
}
