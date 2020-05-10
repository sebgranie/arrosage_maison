import { HttpClient } from '@angular/common/http';
import { Programme, Programs } from '../../shared/models/programme';

export class ProgrammeService {
    
    public programs = new Array<Programme>();

    constructor(private http: HttpClient) { }

    public addProgram(program: Programme){
        return this.http.post<Programme>('http://127.0.0.1:5000/api/programs', program).subscribe(
            (resp) => {
                this.programs.push(program);
            }
        );
    }

    public getPrograms(){
        return this.http.get<Programs>('http://127.0.0.1:5000/api/programs');
    }

    public deleteProgram(index: number){
        return this.http.delete<Programme>(`http://127.0.0.1:5000/api/programs/${index}`);
    }

    public updateProgram(index: number, updatedProgram: Programme){
        return this.http.put<Programme>(`http://127.0.0.1:5000/api/programs/${index}`, updatedProgram);
    }



}