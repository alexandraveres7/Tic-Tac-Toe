import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Leaderboard } from '../leaderboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  leaderboardCollection: AngularFirestoreCollection<Leaderboard>;
  ldboards: Observable<Leaderboard[]>;

  constructor(public afs: AngularFirestore) {
    this.ldboards = this.afs.collection('ldboards').valueChanges();
  }

  getLeaderboards(){
    return this.ldboards;
  }
}


