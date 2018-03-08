// (Standard component import up here)

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Post {
    Address: string;
    Email: string;
    Lastname: string;
    mobile: number;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    postsCol: AngularFirestoreCollection<Post>;
    posts: Observable<Post[]>;

    constructor(private afs: AngularFirestore) {

    }

    ngOnInit() {
       this.postsCol = this.afs.collection('posts');
       this.posts = this.postsCol.valueChanges();

    }
}