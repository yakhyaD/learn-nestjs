import { Controller, Get, Post as POST, Param, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostService) {}

    @Get()
    getPosts(): Promise<Post[]> {
        return this.postService.getPosts();
    }

    @Get(':id')
    getOnePost(@Param('id', new ParseIntPipe()) id : number): Promise<Post> {
        return this.postService.getOnePost(id);
    }

    @POST()
    async addPost(@Body() post : CreatePostDto): Promise<Post> {
        return this.postService.addPost(post);
    }

    @Delete(':id')
    deletePost(@Param('id') id : number): Promise<void> {
        return this.postService.deletePost(id);
    }
    // @Put(':id')
    // updatePost(@Param('id', new ParseIntPipe()) id : number, @Body() post : Post) {
    //     return this.postService.updatePost(id, post);
    // }

}
