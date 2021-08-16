import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity'


@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ){}

    getPosts(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    getOnePost(id : number): Promise<Post> {
        return this.postsRepository.findOne(id);
    }

    async addPost(body : CreatePostDto): Promise<Post> {
        const newPost = new Post();
        newPost.title = body.title
        newPost.body = body.body
        return await this.postsRepository.save(newPost)
    }

    async deletePost(id : number): Promise<void> {
        await this.postsRepository.delete(id);
    }
    // updatePost(id : number, post : Post) {
    //     const oldPost = this.posts.find(p => p.id === id);
    //     if (oldPost) {
    //         oldPost.title = post.title ?? oldPost.title;
    //         oldPost.body = post.body ?? oldPost.body;
    //         return {"id": post.id, "msg": "Post successfully updated"}
    //     }
    //     post.id = this.posts[this.posts.length - 1].id + 1;
    //     this.posts.push(post);
    //     return { "id": post.id, "msg": "Post successfully added" }
    // }
}
