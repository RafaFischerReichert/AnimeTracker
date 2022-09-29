import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnimeEntry } from "src/app/models/anime-entry";
import { AnimeEntryFirebaseService } from "src/app/services/anime-entry-firebase.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  animeEntries: AnimeEntry[];

  constructor(
    private router: Router,
    private entryFS: AnimeEntryFirebaseService
  ) {
    this.carregarEntries();
  }

  ngOnInit() {

  }

  carregarEntries() {
    this.entryFS.getEntries().subscribe((res) => {
      this.animeEntries = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as AnimeEntry),
        } as AnimeEntry;
      });
    });
  }

  irParaCadastrar() {
    this.router.navigate(["/cadastrar"]);
  }

  irParaDetalhar(entry: AnimeEntry) {
    this.router.navigateByUrl("/detalhar", { state: { objeto: entry } });
  }
}
