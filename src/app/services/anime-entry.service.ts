import { Injectable } from "@angular/core";
import { AnimeEntry } from "../models/anime-entry";

@Injectable({
  providedIn: "root",
})
export class AnimeEntryService {
  private _entries: AnimeEntry[] = [];

  constructor() {
    //let entry = new AnimeEntry("Naruto","1999","Shounen","Mangá","Pierrot",190,220,3);
    //this.insert(entry);
  }

  public get animeEntries(): AnimeEntry[] {
    return this._entries;
  }

  public insert(entry: AnimeEntry) {
    let entrada = new AnimeEntry(
      entry.titulo,
      entry.ano,
      entry.genero,
      entry.origem,
      entry.studio,
      entry.watched,
      entry.total,
      entry.rating
    );
    console.log(entrada.id);
    this._entries.push(entrada);
  }

  public editEntry(
    entry: AnimeEntry,
    titulo: string,
    ano: string,
    genero: string,
    origem: string,
    studio: string,
    watched: number,
    rating: number
  ): boolean {
    console.log(entry.id);
    for (let i = 0; i < this._entries.length; i++) {
      if (this._entries[i].id === entry.id) {
        this._entries[i].titulo = titulo;
        this._entries[i].ano = ano;
        this._entries[i].genero = genero;
        this._entries[i].origem = origem;
        this._entries[i].studio = studio;
        this._entries[i].watched = watched;
        this._entries[i].rating = rating;
        return true;
      }
    }
    return false;
  }

  public deleteEntry(entry: AnimeEntry): boolean {
    console.log(entry.id);
    for (let i = 0; i < this._entries.length; i++) {
      if (this._entries[i].id === entry.id) {
        this._entries.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
