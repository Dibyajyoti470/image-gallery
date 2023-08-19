import { Component } from '@angular/core';
import { Image } from '../../models/ImageModel';
import { CollageService } from './collage.service';

@Component({
  selector: 'app-collage',
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.scss'],
})
export class CollageComponent {
  images: Image[] = [];
  collage: Image[][] = [];
  currentPage: number = 1;
  isFetching: boolean = false;

  readonly BASE_URL = 'https://picsum.photos/v2/list';
  readonly COLUMN_COUNT = 3;
  readonly FIRST_PAGE_LIMIT = 30;
  readonly SUBSEQUENT_PAGE_LIMIT = this.FIRST_PAGE_LIMIT / 2;

  constructor(private collageService: CollageService) {}

  ngOnInit(): void {
    this.getImages(this.currentPage, this.FIRST_PAGE_LIMIT);
  }

  getImages(page: number, limit: number): void {
    this.isFetching = true;
    this.collageService.fetchImages(this.BASE_URL, page, limit).subscribe({
      next: (res: Image[]) => {
        if (res) {
          this.images = [...this.images, ...res];
          const newCollage = this.collageService.createCollage(
            res,
            this.COLUMN_COUNT
          );
          this.collage = [...this.collage, ...newCollage];
          this.isFetching = false;
        }
      },
      error: (error: any) => {
        console.error(error);
        this.isFetching = false;
      },
    });
  }

  onScroll(): void {
    if (!this.isFetching) {
      this.currentPage = this.currentPage + 1;
      this.getImages(this.currentPage, this.SUBSEQUENT_PAGE_LIMIT);
    }
  }
}
