export class AnimeEntry {
  private _id: string;
  private _titulo: string;
  private _ano: string;
  private _genero: string;
  private _origem: string;
  private _studio: string;
  private _watched: number;
  private _rating: number;

  constructor(
    titulo: string,
    ano: string,
    genero: string,
    origem: string,
    studio: string,
    watched: number,
    rating: number
  ) {
    let chave = new Date();
    this._id = chave.getTime().toString();
    this._titulo = titulo;
    this._ano = ano;
    this._genero = genero;
    this._origem = origem;
    this._studio = studio;
    this._watched = watched;
    this._rating = rating;
  }


    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter titulo
     * @return {string}
     */
	public get titulo(): string {
		return this._titulo;
	}

    /**
     * Getter ano
     * @return {string}
     */
	public get ano(): string {
		return this._ano;
	}

    /**
     * Getter genero
     * @return {string}
     */
	public get genero(): string {
		return this._genero;
	}

    /**
     * Getter origem
     * @return {string}
     */
	public get origem(): string {
		return this._origem;
	}

    /**
     * Getter studio
     * @return {string}
     */
	public get studio(): string {
		return this._studio;
	}

    /**
     * Getter watched
     * @return {number}
     */
	public get watched(): number {
		return this._watched;
	}

    /**
     * Getter rating
     * @return {number}
     */
	public get rating(): number {
		return this._rating;
	}

    /**
     * Setter titulo
     * @param {string} value
     */
	public set titulo(value: string) {
		this._titulo = value;
	}

    /**
     * Setter ano
     * @param {string} value
     */
	public set ano(value: string) {
		this._ano = value;
	}

    /**
     * Setter genero
     * @param {string} value
     */
	public set genero(value: string) {
		this._genero = value;
	}

    /**
     * Setter origem
     * @param {string} value
     */
	public set origem(value: string) {
		this._origem = value;
	}

    /**
     * Setter studio
     * @param {string} value
     */
	public set studio(value: string) {
		this._studio = value;
	}

    /**
     * Setter watched
     * @param {number} value
     */
	public set watched(value: number) {
		this._watched = value;
	}

    /**
     * Setter rating
     * @param {number} value
     */
	public set rating(value: number) {
		this._rating = value;
	}

}
