import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
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

  constructor(
    private alertController: AlertController,
    private router: Router,
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
      studio: ["", [Validators.required]]
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
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
    this.entryService.insert(this.form_cadastrar.value);
    this.presentAlert("Cadastro", "Sucesso", "Anime Cadastrado!");
    this.router.navigate(["/home"]);
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
}
