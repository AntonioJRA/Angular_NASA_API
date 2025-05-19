import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent {
  data: any = null;
  imagenGrande: string | null = null;

  ngOnInit() {
    this.data = localStorage.getItem('details-item');
    this.data = JSON.parse(this.data);
  }

  openImg(url: string) {
    this.imagenGrande = url;
  }

  closeImg() {
    this.imagenGrande = null;
  }
}
