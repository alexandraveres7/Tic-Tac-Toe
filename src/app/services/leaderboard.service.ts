import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Leaderboard } from '../leaderboard.model';
import {Observable, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {pipe} from 'rxjs';
import get = Reflect.get;

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  leaderboardCollection: AngularFirestoreCollection<Leaderboard>;
  ldboards: Observable<Leaderboard[]>;
  itemDoc: AngularFirestoreDocument<Leaderboard>;

  private leaderboard: Subject<Leaderboard>;

  constructor(private afs: AngularFirestore) {
    // this.ldboards = this.afs.collection('ldboards').valueChanges();
    this.leaderboard = new Subject<Leaderboard>();
    this.leaderboardCollection = this.afs.collection('ldboards', ref => ref.orderBy('name1', 'asc'));


    this.ldboards = this.leaderboardCollection.snapshotChanges().pipe(
      map(ldboards => ldboards.map( s => {
        const data = s.payload.doc.data() as Leaderboard;
        const sid = s.payload.doc.id;
        return {sid, ...data};
      })),
    );
  }

  leaderBoardFuntion(playerX: string ) {
    this.leaderboardCollection = this.afs.collection('ldboards', ref => ref.where('name1', '==' , playerX ));
  }


  getLeaderboards() {
    return this.ldboards;
  }
  getItems() {
    return this.ldboards;
  }

  addItem(ld: Leaderboard) {
    this.leaderboardCollection.add(ld).then(value => {
      console.log(value.id);
      this.setPlayers(value.id, ld.lname1, ld.lname2, ld.name1, ld.name2);
    });
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

  winnerIs(id: string, name1: string, name2: string, lname1: string, lname2: string, winner: string) {
    const leaderboard: Leaderboard = {
      id,
      name1,
      name2,
      lname1,
      lname2,
      winner
    };
    this.itemDoc = this.afs.doc(`ldboards/${id}`);
    this.itemDoc.update(leaderboard);
  }

  setPlayers(id: string, lname1: string, lname2: string, name1: string, name2: string) {
    const newPlay: Leaderboard = {
      name1,
      name2,
      lname1,
      lname2,
      id,
    };
    console.log(newPlay);
    this.leaderboard.next(newPlay);
  }

  getPlayers() {
    return this.leaderboard;
  }
}


