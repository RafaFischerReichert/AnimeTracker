import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AnimeEntry } from "src/app/models/anime-entry";
import { AnimeEntryService } from "src/app/services/anime-entry.service";

@Component({
  selector: "app-detalhar",
  templateUrl: "./detalhar.page.html",
  styleUrls: ["./detalhar.page.scss"],
})
export class DetalharPage implements OnInit {
  animeEntry: AnimeEntry;
  titulo: string;
  ano: string;
  genero: string;
  origem: string;
  studio: string;
  watched: number;
  total: number;
  rating: number;
  edicao: boolean;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private entryService: AnimeEntryService
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    
    this.animeEntry = nav.extras.state.objeto;
    console.log(this.animeEntry);
    this.titulo = this.animeEntry.titulo;
    this.genero = this.animeEntry.genero;
    this.origem = this.animeEntry.origem;
    this.studio = this.animeEntry.studio;
    this.watched = this.animeEntry.watched;
    this.total = this.animeEntry.total;
    this.rating = this.animeEntry.rating;
    console.log(this.animeEntry);
    
  }

  alterarEdicao(): void {
    if (this.edicao == false) {
      this.edicao = true;
    } else {
      this.edicao = false;
    }
  }

  private validar(campo: any): boolean {
    if (!campo) {
      return false;
    }
    return true;
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async presentAlertConfirm(
    header: string,
    subHeader: string,
    message: string
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: "Cancelar",
          role: "cancelar",
          cssClass: "danger",
          handler: () => {},
        },
        {
          text: "Confirmar",
          role: "confirm",
          cssClass: "success",
          handler: () => {
            this.excluirContato();
          },
        },
      ],
    });

    await alert.present();
  }

  editar() {
    if (
      this.validar(this.titulo) &&
      this.validar(this.ano) &&
      this.validar(this.genero) &&
      this.validar(this.origem) &&
      this.validar(this.studio) &&
      this.validar(this.watched) &&
      this.validar(this.total)
    ) {
      if (
        this.entryService.editEntry(
          this.animeEntry,
          this.titulo,
          this.ano,
          this.genero,
          this.origem,
          this.studio,
          this.watched,
          this.rating
        )
      ) {
        this.presentAlert("Animes", "Sucesso", "Anime Editado!");
        this.router.navigate(["/home"]);
      } else {
        this.presentAlert("Animes", "Erro", "Anime não encontrado!");
      }
    } else {
      this.presentAlert("Animes", "Erro", "Todos os campos são Obrigatórios!");
    }
  }

  excluir(): void {
    this.presentAlertConfirm(
      "Animes",
      "Excluir Entrada",
      "Deseja mesmo excluir essa entrada?"
    );
  }

  private excluirContato(): void {
    if (this.entryService.deleteEntry(this.animeEntry)) {
      this.presentAlert("Animes", "Sucesso", "Anime Excluído!");
      this.router.navigate(["/home"]);
    } else {
      this.presentAlert("Animes", "Erro", "Anime não encontrado!");
    }
  }
}
