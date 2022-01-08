import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from './update-user/update-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Attributes

	cvList = [];
	dataSource = new MatTableDataSource();
	displayedColumns = ['ID', 'Name', 'Email','Gender','Status' ,'Actions'];
	isLoading = false;
  data:any=null;

	// filter Attributes
	panelOpenState = false;

	mainFilter = '';


	constructor(
    private userService:UserService,
		public dialog: MatDialog,
    private toastr: ToastrService,
    private router:Router) {

	}

	ngOnInit() {
		this.reloadList();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;

	}

  
	addUser() {
    this.router.navigate(['add-user'])
	}

  
	reloadList() {
		this.isLoading = true;
		this.userService.getList().subscribe((response) => {
			this.isLoading = false;
      this.data=response.data;
			this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
		},(err) =>{
      this.toastr.error('Unexpected error.');
    });
	}

	deleteUser(user) {
		if (confirm('You are going to delete the user : '+user.name)) {
			this.userService.deleteUser(user.id).subscribe(resp => {
			},(err) =>{
        this.toastr.error('Unexpected error .');
        this.reloadList();
      });
      let i=0;
      let out=false
      while(i<this.data.length && !out){
        if(this.data[i].id==user.id){
          this.data.splice(i,1);
          out=true;
        }
        i++;
      }
      
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
		}

	}

  showCv(id){}

	applyFilter() {

		const mainFilter = this.mainFilter;

		const finalmainFilter = (mainFilter === null || mainFilter === '') ? '' : mainFilter;

		this.dataSource.filter = finalmainFilter.trim().toLowerCase();
	}

  editUser(user){
    this.dialog.open(UpdateUserComponent, {
            width: '70%',
            maxHeight: '90vh',
            position: {
              top: '5%',
              left: '20%',
            },
            disableClose: true,
            data :  user
          })
          .afterClosed()
          .subscribe((result) => {
            if (result) {
              let i=0;
              let out=false
              while(i<this.data.length && !out){
                if(this.data[i].id==result.id){
                  this.data[i]=result
                  out=true;
                }
                i++;
              }
              
              this.dataSource = new MatTableDataSource(this.data);
              this.dataSource.paginator = this.paginator;
            }
          });
  }
}
