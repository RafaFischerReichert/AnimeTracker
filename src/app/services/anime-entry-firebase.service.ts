import { Injectable } from "@angular/core";
import { concatMapTo, finalize } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AnimeEntry } from "../models/anime-entry";

@Injectable({
  providedIn: "root",
})
export class AnimeEntryFirebaseService {
  private PATH: string = "entry";
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

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
      donwloadURL: entry.downloadURL
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

  enviarImagem(imagem: any, entry: AnimeEntry) {
    const file = imagem.item(0);
    if (file.type.split("/")[0] !== "image") {
      console.error("Tipo Não Suportado!");
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let uploadedFileURL = fileRef.getDownloadURL();
          uploadedFileURL.subscribe((resp) => {
            entry.downloadURL = resp;
            this.inserirEntry(entry);
          });
        })
      )
      .subscribe();
    return task;
  }
}
