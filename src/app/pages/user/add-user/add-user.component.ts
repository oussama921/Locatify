import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserForm:FormGroup;
  loading:boolean=false;
  isXSmall:boolean;
  
  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private toastr:ToastrService,
    private router:Router,

    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.breakpointObserver.observe(Breakpoints.XSmall).subscribe(res=>{
      this.isXSmall = res.matches;
    })
    
  }

  initForm(){
    this.addUserForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,[Validators.required,Validators.email]],
      gender:[null,Validators.required],
      status:[null,Validators.required]
    })
  }

  addUser(){
    if(this.addUserForm.valid){
      this.loading=true;

      this.userService.addUser(<User>this.addUserForm.value).subscribe((res)=>{
        console.log(res)
        if(res.data){
          this.toastr.success('User added successfully.');
          this.router.navigate(['users'])
        }else{
          this.toastr.error("Unexpected error.");
          this.loading=false;
        }
      });
    }
  }

}
