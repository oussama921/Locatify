import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";

/***** Material Imports*/
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { UserService } from "src/app/services/user.service";
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatInputModule } from "@angular/material/input";

/********* */

const MaterialModules=[
  MatExpansionModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatPaginatorModule,
  MatDialogModule,
  MatTableModule,
  MatButtonModule,
  MatRadioModule,
  MatTooltipModule,
  MatInputModule
  
]

@NgModule({
    declarations: [
      UserComponent,
      UpdateUserComponent
    ],
    imports: [
      MaterialModules,
      CommonModule,
      UserRoutingModule,
      FormsModule,
      ReactiveFormsModule,
  
    ],
    entryComponents:[UpdateUserComponent],
    providers: [
      UserService
    ],
    bootstrap: []
  })
  export class UserModule { }