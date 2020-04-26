import { Component, OnInit } from '@angular/core';
import { Student } from './models/student';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  students = new Array<Student>();

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(){
    this.getStudents();
  }


  public getStudents()  {
    return this.http.get<any>('http://127.0.0.1:5000/api/students').subscribe(
      (students) => {
        for(let i = 0; i <= 4; i++){
          if(students[i]){
            const studentToAdd = students[i] as Student;
            studentToAdd.id = i;
            this.students.push(studentToAdd);
          }
        }
      }
    )
  }

  public deleteStudent(id: number) {
    return this.http.delete<any>(`http://127.0.0.1:5000/api/students/${id}`).subscribe(
      (res) => {
        console.log(res);
        this.students.splice(id - 1, 1);
      }
    )
  }

}
