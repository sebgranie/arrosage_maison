import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: User;

    constructor(public afAuth: AngularFireAuth, public router: Router) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                localStorage.setItem('user', null);
            }
        })
    }


    public login(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }


    public async logout() {
        await this.afAuth.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['login']);
    }
}