import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post.module';
import { PostMiddleware } from './common/middlewares/post.middleware'
import { UsersModule } from './users/users.module'
import ormconfig from './ormconfig'

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),PostModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostMiddleware)
      .forRoutes({path: 'posts', method: RequestMethod.POST})
  }
}
