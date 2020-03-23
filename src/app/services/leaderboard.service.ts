import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Leaderboard } from '../leaderboard.model';
import { Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {pipe} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  leaderboardCollection: AngularFirestoreCollection<Leaderboard>;
  ldboards: Observable<Leaderboard[]>;
  itemDoc: AngularFirestoreDocument<Leaderboard>;

  constructor(private afs: AngularFirestore) {
    // this.ldboards = this.afs.collection('ldboards').valueChanges();

    this.leaderboardCollection = this.afs.collection('ldboards', ref => ref.orderBy('name1', 'asc'));


    this.ldboards = this.leaderboardCollection.snapshotChanges().pipe(
      map(ldboards => ldboards.map( s => {
        const data = s.payload.doc.data() as Leaderboard;
        const sid = s.payload.doc.id;
        return {sid, ...data};
      })),
    );
  }

  getLeaderboards() {
    return this.ldboards;
  }
  getItems() {
    return this.ldboards;
  }

  addItem(ld: Leaderboard) {
    this.leaderboardCollection.add(ld);
  }

  addLeaderBoard(lid: string) {
    const newLeaderBoard: Leaderboard = {
      id : lid
    };
    this.leaderboardCollection.add(newLeaderBoard).then(
      ref => {
        const i = ref.id;
        ref.update({i});
      }
    );
  }

  deleteItem(item: Leaderboard) {
    this.itemDoc = this.afs.doc(`ldboards/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Leaderboard) {
    this.itemDoc = this.afs.doc(`ldboards/${item.id}`);
    this.itemDoc.update(item);
  }

}


