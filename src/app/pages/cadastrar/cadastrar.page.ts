import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AnimeEntryFirebaseService } from "src/app/services/anime-entry-firebase.service";
import { AnimeEntryService } from "src/app/services/anime-entry.service";

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.page.html",
  styleUrls: ["./cadastrar.page.scss"],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private entryFS: AnimeEntryFirebaseService,
    private entryService: AnimeEntryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.data = new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      titulo: ["", [Validators.required]],
      ano: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      origem: ["", [Validators.required]],
      studio: ["", [Validators.required]],
      watched: ["", [Validators.required]],
      total: ["", [Validators.required]],
      rating: [
        "",
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      imagem: ["", [Validators.required]],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert(
        "Cadastro",
        "Erro",
        "Todos os campos são Obrigatórios!"
      );
      return false;
    } else {
      this.cadastrar();
      return true;
    }
  }

  private cadastrar(): void {
    this.showLoading("Aguarde...", 10000);
    this.entryFS
      .enviarImagem(this.imagem, this.form_cadastrar.value)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert("Animes", "Sucesso", "Anime Cadastrado.");
        this.router.navigate(["/home"]);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.presentAlert("Animes", "Erro", "Erro ao Realizar Cadastro.");
        console.log(error);
      });
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

  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });
    loading.present();
  }
}
