import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AnimeEntry } from "src/app/models/anime-entry";
import { AnimeEntryService } from "src/app/services/anime-entry.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  animeEntries: AnimeEntry[];
  constructor(private router: Router, private entryService: AnimeEntryService) {
    this.animeEntries = this.entryService.animeEntries;
  }

  ngOnInit() {}

  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  irParaDetalhar(entry: AnimeEntry){
    this.router.navigateByUrl("/detalhar",
    {state: {objeto:entry}});
  }

}
