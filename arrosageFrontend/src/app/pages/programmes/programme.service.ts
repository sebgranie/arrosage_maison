import { HttpClient } from '@angular/common/http';
import { Programme } from '../../shared/models/programme';

export class ProgrammeService {
    
    constructor(private http: HttpClient) { }


    public addProgram(program: Programme){
        return this.http.post<Programme>('http://127.0.0.1:5000/api/programs', program).subscribe();
    }

}