import { CreatePostDto } from './dto/create-post';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
        private readonly usersService: UsersService
    ) {}

    async createPost(post: CreatePostDto, userId: number): Promise<Post>{
        const user = await this.usersService.findOneById(userId);
        post.user = user;
        return await this.postsRepository.save(post);
    }

    async findAllPosts(): Promise<Post[]>{
        return await this.postsRepository.find();
    }

    async findPostById(id: number): Promise<Post>{
        return await this.postsRepository.findOne(id, {relations: ["user"]});
    }

    async updatePost(post: CreatePostDto, postId: number): Promise<Post>{
        await this.postsRepository.update(post, {id: postId});
        return await this.postsRepository.findOne(postId);
    }

    async deletePost(postId: number): Promise<string>{
        await this.postsRepository.delete({id: postId});
        return "Post deleted successfully";
    }
}
