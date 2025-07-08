/*
Here is the component were we call Post Service methods and display it with 
Create, Edit, Delete and View Buttons
*/

// CommonModule -basic module that contains Angular Directives and pipes
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Post } from "../post";
import { PostService } from "../post.service";

@Component({
  selector: "app-index",
  standalone: true, // Can exist without NgModule
  // CommonModule exports basic directives and pipes
  imports: [CommonModule, RouterModule],
  templateUrl: "./index.component.html",
  styleUrl: "./index.component.css",
})
export class IndexComponent {
  // Interface
  posts: Post[] = [];

  /*------------------------------------------
  --------------------------------------------
  To Use Services , something outside from a class 
  should be in the constructor
  --------------------------------------------
  --------------------------------------------*/

  constructor(public PostService: PostService) {}

  /**
   * ngOnInit method that is called when component is
   * initialized and saves it to the property posts that was already initialized
   **/
  ngOnInit(): void {
    this.PostService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  /**
   * Write the code
   *
   * Delete the Post
   * **/

  deletePost(id: number) {
    this.PostService.delete(id).subscribe((res) => {
      this.posts = this.posts.filter((item) => item.id !== id);
      console.log("Post deleted successfully!");
    });
  }
}
