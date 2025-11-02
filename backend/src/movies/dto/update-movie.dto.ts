export class UpdateMovieDto {
  readonly title?: string;
  readonly description?: string;
  readonly fileName?: string;
  readonly poster?: string;
  readonly genre: string;
  readonly year: number;
  readonly rating: number;
}
