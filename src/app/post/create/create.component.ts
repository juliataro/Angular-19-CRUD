import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { PostService } from "../post.service";
import { Route, Router } from "@angular/router";

@Component({
  selector: "app-create",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./create.component.html",
  styleUrl: "./create.component.css",
})
export class CreateComponent {
  form!: FormGroup;

  // We use postService and router outside of the class
  constructor(public postService: PostService, private router: Router) {}

  /**
   * Form with Validators
   * this.form.controls — is object, that consists all fields
   *  (title, body) в виде экземпляров FormControl.
   *
   * */

  ngOnInit(): void {
    this.form = new FormGroup({
      // If there are several validators, so it could be this way
      // [Validators.required, Validators.minLength(5)])
      title: new FormControl("", [Validators.required]),
      body: new FormControl("", Validators.required),
    });
  }

  /**
   * Form with Validators
   * this.form.controls — is object, that consists all fields
   *  (title, body) в виде экземпляров FormControl.
   * TypeScript Getter f function allows convenient access to the them
   */
  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res: any) => {
      console.log("Post created successfully!");
      this.router.navigateByUrl("post/index");
    });
  }
}
