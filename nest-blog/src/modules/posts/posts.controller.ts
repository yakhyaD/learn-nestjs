import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, Request, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post';
import { PostsService } from './posts.service';

@Controller("posts")
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getPosts() {
        return await this.postsService.findAllPosts();
    }

    @Get("/:id")
    async getPost(@Param("id", ParseIntPipe) id: number) {
        return await this.postsService.findPostById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createPost(@Body() post: CreatePostDto, @Request() req) {
        return await this.postsService.createPost(post, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    async updatePost(@Body() post: CreatePostDto, @Request() req) {
        return await this.postsService.updatePost(post, req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id',ParseIntPipe) id: number) {
        return await this.postsService.deletePost(id);
    }

}
