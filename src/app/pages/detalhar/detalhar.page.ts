import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AnimeEntry } from "src/app/models/anime-entry";
import { AnimeEntryFirebaseService } from "src/app/services/anime-entry-firebase.service";

@Component({
  selector: "app-detalhar",
  templateUrl: "./detalhar.page.html",
  styleUrls: ["./detalhar.page.scss"],
})
export class DetalharPage implements OnInit {
  animeEntry: AnimeEntry;
  data: string;
  edicao: boolean;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private router: Router,
    private entryFS: AnimeEntryFirebaseService,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.animeEntry = nav.extras.state.objeto;
    console.log(this.animeEntry);
    this.form_cadastrar = this.formBuilder.group({
      titulo: [this.animeEntry.titulo, [Validators.required]],
      ano: [this.animeEntry.ano, [Validators.required]],
      genero: [this.animeEntry.genero, [Validators.required]],
      origem: [this.animeEntry.origem, [Validators.required]],
      studio: [this.animeEntry.studio, [Validators.required]],
      watched: [this.animeEntry.watched, [Validators.required]],
      total: [this.animeEntry.total, [Validators.required]],
      rating: [
        this.animeEntry.rating,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert("Animes", "Erro", "Todos os campos são Obrigatórios!");
      return false;
    } else {
      this.editar();
    }
  }

  alterarEdicao(): void {
    if (this.edicao == false) {
      this.edicao = true;
    } else {
      this.edicao = false;
    }
  }

  async presentAlert(
    cabecalho: string,
    subcabecalho: string,
    mensagem: string
  ) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: ["OK"],
    });
    await alert.present();
  }

  async presentAlertConfirm(
    cabecalho: string,
    subcabecalho: string,
    mensagem: string,
    acao: any
  ) {
    const alert = await this.alertController.create({
      header: cabecalho,
      subHeader: subcabecalho,
      message: mensagem,
      buttons: [
        {
          text: "Cancelar",
          role: "cancelar",
          cssClass: "secondary",
          handler: () => {
            console.log("Cancelou");
          },
        },
        {
          text: "Confirmar",
          role: "confirm",
          handler: (acao) => {
            acao;
          },
        },
      ],
    });
    await alert.present();
  }

  editar() {
    this.entryFS
      .editarEntry(this.form_cadastrar.value, this.animeEntry.id)
      .then(() => {
        this.presentAlert("Animes", "Sucesso", "Edição Realizada.");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.presentAlert("Animes", "Erro", "Erro ao Atualizar Entrada.");
        this.router.navigate(["/home"]);
      });
  }

  excluir(): void {
    this.presentAlertConfirm(
      "Animes",
      "Excluir Entrada",
      "Deseja mesmo excluir essa entrada?",
      this.excluirEntrada()
    );
  }

  private excluirEntrada() {
    this.entryFS
      .excluirEntry(this.animeEntry)
      .then(() => {
        this.presentAlert("Animes", "Sucesso", "Entrada Excluída.");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert("Animes", "Erro", "Entrada Não Encontrada.");
      });
  }
}
