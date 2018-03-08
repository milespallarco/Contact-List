// (Standard component import up here)

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
    Address: string;
    Email: string;
    Lastname: string;
    Firstname: string;
    mobile: number;
    phone: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    postsCol: AngularFirestoreCollection<Post>;
    posts: Observable<Post[]>;

    Address: string;
    Email: string;
    Lastname: string;
    Firstname: string;
    mobile: number;
    phone: number;

    constructor(private afs: AngularFirestore) {

    }

    ngOnInit() {
       this.postsCol = this.afs.collection('posts');
       this.posts = this.postsCol.valueChanges();

    }
    addPost(){
        this.afs.collection('posts').add({'Address': this.Address, 'Firstname': this.Firstname, 'Lastname': this.Lastname, 'Email': this.Email, "Mobile": this.mobile, "Phone": this.phone });
    }
}