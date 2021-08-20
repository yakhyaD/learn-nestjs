import { CreatePostDto } from './dto/create-post';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
        const post = await this.postsRepository.findOne(id, {relations: ["user"]});
        if(!post){
            throw new NotFoundException("Post does not exist")
        }
        return post;
    }

    async updatePost(post: CreatePostDto, postId: number, userId: number): Promise<Post>{
        const postToUpdate = await this.postsRepository.findOne(postId, {relations: ["user"]});
        if(postToUpdate.user.id === userId) {
            await this.postsRepository.update({id: postToUpdate.id}, post);
            return await this.postsRepository.findOne(postId);
        }
        throw new UnauthorizedException("Action unauthorized");
    }

    async deletePost(postId: number, userId: number): Promise<{msg:string, postId: number}> {
        const user = await this.usersService.findOneById(userId);
        const { affected } = await this.postsRepository.delete({id: postId, user: user});
        if(affected === 0){
            throw new UnauthorizedException("Action unauthorized");
        }

        return {msg:"Post deleted successfully",  postId};
    }
}
