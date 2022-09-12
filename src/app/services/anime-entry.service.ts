import { Injectable } from "@angular/core";
import { AnimeEntry } from "../models/anime-entry";

@Injectable({
  providedIn: "root",
})
export class AnimeEntryService {
  private _entries: AnimeEntry[] = [];

  constructor() {
  }

  public get animeEntries(): AnimeEntry[] {
    return this._entries;
  }

  public insert(entry: AnimeEntry) {
    this._entries.push(entry);
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
    for (let i of this._entries) {
      if (i.id == entry.id) {
        i.titulo = titulo;
        i.ano = ano;
        i.genero = genero;
        i.origem = origem;
        i.studio = studio;
        i.watched = watched;
        i.rating = rating;
        return true;
      }
    }
    return false;
  }

  public deleteEntry(entry: AnimeEntry): boolean {
    for (let i = 0; i < this._entries.length; i++) {
      if (this._entries[i].id == entry.id) {
        this._entries.splice(i, 1);
        return true;
      }
    }
    return false;
  }
}
