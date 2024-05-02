import {MatDialog} from "@angular/material/dialog";
import {EmpAddEditComponent} from "./emp-add-edit/emp-add-edit.component";
import {EmployeeService} from "./services/employee.service";
import {AfterViewInit, Component, ViewChild ,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _dialog: MatDialog, private _empService: EmployeeService) {
  }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  OpenAddEditEmpForm(){
    const dailogRef= this._dialog.open(EmpAddEditComponent);
    dailogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }
  getEmployeeList(){
    this._empService.getEmployeeList().subscribe({
      next: (res)=> {
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.sort= this.sort;
          this.dataSource.paginator= this.paginator;
    },
    error: console.log,
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: any){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert('Employee Deleted');
        this.getEmployeeList();
    },
      error: console.log,
    })
  }
  openEditFrom(data: any){
    const dailogRef=this._dialog.open(EmpAddEditComponent,{
      data,
    })
    dailogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })
  }
}
