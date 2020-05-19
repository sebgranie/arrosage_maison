import { HttpClient } from '@angular/common/http';
import { Programme, Programs } from '../../shared/models/programme';
import { environment } from '../../../environments/environment';

export class ProgrammeService {
    
    public programs = new Array<Programme>();

    constructor(private http: HttpClient) { }

    public addProgram(program: Programme){
        return this.http.post<Programme>(`${environment.apiPort}api/programs`, program).subscribe(
            (resp) => {
                this.programs.push(program);
            }
        );
    }

    public getPrograms(){
        return this.http.get<Programs>(`${environment.apiPort}api/programs`);
    }

    public deleteProgram(index: number){
        return this.http.delete<Programme>(`${environment.apiPort}api/programs/${index}`);
    }

    public updateProgram(index: number, updatedProgram: Programme){
        return this.http.put<Programme>(`${environment.apiPort}api/programs/${index}`, updatedProgram);
    }



}