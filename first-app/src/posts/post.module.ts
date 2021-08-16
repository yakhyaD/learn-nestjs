import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostsController } from './posts.controller';
import { PostService } from './posts.service';
import { Post } from './post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostService],
})
export class PostModule { }
