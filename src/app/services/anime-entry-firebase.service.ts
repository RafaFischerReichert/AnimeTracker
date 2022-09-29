import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AnimeEntry } from "../models/anime-entry";

@Injectable({
  providedIn: "root",
})
export class AnimeEntryFirebaseService {
  private PATH: string = "entry";
  constructor(private angularFirestore: AngularFirestore) {}

  getEntry(id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getEntries() {
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirEntry(entry: AnimeEntry) {
    return this.angularFirestore.collection(this.PATH).add({
      titulo: entry.titulo,
      ano: entry.ano,
      genero: entry.genero,
      origem: entry.origem,
      studio: entry.studio,
      watched: entry.watched,
      total: entry.total,
      rating: entry.rating,
    });
  }

  editarEntry(entry: AnimeEntry, id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      titulo: entry.titulo,
      ano: entry.ano,
      genero: entry.genero,
      origem: entry.origem,
      studio: entry.studio,
      watched: entry.watched,
      total: entry.total,
      rating: entry.rating,
    });
  }

  excluirEntry(entry: AnimeEntry) {
    return this.angularFirestore.collection(this.PATH).doc(entry.id).delete();
  }
}
