import { Component } from "@angular/core";
import { Post } from "../post";
import { PostService } from "../post.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-view",
  // Standalone true, means that can exist without @NgModule
  // @NgModule helps organize app into cohesive blocks of functionality
  standalone: true,
  imports: [],
  templateUrl: "./view.component.html",
  styleUrl: "./view.component.css",
})
export class ViewComponent {
  id!: number;
  post!: Post;

  /**
   *
   * Create Constructor
   */

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   *
   * Write code on method
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params["postId"];

    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;
    });
  }
}
