import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  updateUserForm:FormGroup;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
		private toastr: ToastrService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.updateUserForm = this.fb.group({
      id:[this.data.id],
      name:[this.data.name,Validators.required],
      email:[this.data.email,[Validators.required,Validators.email]],
      gender:[this.data.gender,Validators.required],
      status:[this.data.status,Validators.required]
    })
  }

  updateUser(){
    if(this.updateUserForm.valid){
      this.dialogRef.close(this.updateUserForm.value);
      this.userService.updateUser(<User>this.updateUserForm.value).subscribe((res)=>{
      });
    }
  }

  cancel(){
    this.dialogRef.close(false)
  }
}
