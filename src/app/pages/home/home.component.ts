import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs;
  users;

  constructor(
    private router:Router,
    private newsService : NewsService,
    private userService : UserService,
    
  ) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe((blogsList:any)=>{
      console.log(blogsList)
      this.blogs = blogsList.data.slice(0,3);
    });

    this.userService.getList().subscribe((usersList:any)=>{
      this.users = usersList.data.slice(0,6);
    })
  }

  addUser(){
    this.router.navigate(['add-user'])
  }

}
