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
interface PostId extends Post {
    id: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    postsCol: AngularFirestoreCollection<Post>;
    posts: any;

    Address: string;
    Email: string;
    Lastname: string;
    Firstname: string;
    mobile: number;
    phone: number;

    postDoc: AngularFirestoreDocument<Post>;
    post: Observable<Post>;

    constructor(private afs: AngularFirestore) {

    }

    ngOnInit() {
       this.postsCol = this.afs.collection('posts');
    //    this.posts = this.postsCol.valueChanges();
       this.posts = this.postsCol.snapshotChanges();
        .map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as Post;
                const id = a.payload.doc.id;
                return {id, data};
            })
        })
    }

    addPost() {
        // this.afs.collection('posts').add({'Address': this.Address, 'Firstname': this.Firstname, 'Lastname': this.Lastname, 'Email': this.Email, "Mobile": this.mobile, "Phone": this.phone });
        this.afs.collection('posts').doc('my-custom-id').set({'Address': this.Address, 'Firstname': this.Firstname, 'Lastname': this.Lastname, 'Email': this.Email, "Mobile": this.mobile, "Phone": this.phone });
    }

    getPost(postId) {
        this.postDoc = this.afs.doc('posts/'+postId);
        this.post = this.postDoc.valueChanges();
    }
}