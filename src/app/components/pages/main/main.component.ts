import { Component } from '@angular/core';
import { NasaService } from '../../../services/nasa.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { count } from 'rxjs';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  datos: any = null;
  lastConecctionDay!: string;
  randomCount: number | null = null;
  startDate: string = '';
  endDate: string = '';
  // para limitar endDate
  today: string = new Date().toISOString().split('T')[0];

  constructor(private nasaService: NasaService, private router: Router) {}

  ngOnInit() {
    const nasaItems = localStorage.getItem('nasa-items');

    /*Se ejecuta el servicio cuando:
        - Es la primera vez que se cargan los datos
        - Ha cambiado el dia */

    if (!nasaItems || this.isAnotherDay()) {
      this.nasaService.getDatos().subscribe((res) => {
        // Para obtener los nombres de las img para los alt
        this.datos = res.map((data: any) => ({
          ...data,
          alt: this.getAltFromUrl(data.url),
        }));
        // console.log(this.datos);
        const storeItems = JSON.stringify(this.datos);
        localStorage.setItem('nasa-items', storeItems);
        // console.log('Llamo al servicio');
      });
    } else {
      // en vez de llamar al servicio, utilizamos los datos guardados en la cookie
      this.datos = JSON.parse(nasaItems);
      // console.log('Llamo a la cookie');
    }
  }

  onSubmitRandom() {
    if (this.randomCount) {
      if (this.randomCount >= 1 && this.randomCount <= 30) {
        this.nasaService.getDatosCount(this.randomCount).subscribe((res) => {
          // Para obtener los nombres de las img para los alt
          this.datos = res.map((data: any) => ({
            ...data,
            alt: this.getAltFromUrl(data.url),
          }));
        });
      } else {
        alert('El valor de count debe ser entre 1 y 30');
      }
    }
  }
  onSubmitDates() {
    if (!this.startDate || !this.endDate) {
      alert('Por favor completa ambas fechas.');
      return;
    } else {
      this.nasaService
        .getDatosBeetweenDates(this.startDate, this.endDate)
        .subscribe((res) => {
          // Para obtener los nombres de las img para los alt
          this.datos = res.map((data: any) => ({
            ...data,
            alt: this.getAltFromUrl(data.url),
          }));
        });
    }
  }

  get startDateMax(): string {
    return this.endDate || this.today;
  }

  isAnotherDay(): boolean {
    const lastConnectionCookie = localStorage.getItem('last-connection');
    const today = new Date().toISOString().split('T')[0];

    if (!lastConnectionCookie || lastConnectionCookie !== today) {
      this.lastConecctionDay = new Date().toISOString().split('T')[0];
      localStorage.setItem('last-connection', this.lastConecctionDay);
      // console.log('Creo la cookie lastConnection');
      return true;
    } else {
      this.lastConecctionDay = lastConnectionCookie;
      // console.log('Llamo la cookie lastConnection');
      return false;
    }
  }

  getAltFromUrl(url: string) {
    return url.split('/').pop();
  }

  getDetails(item: any): void {
    localStorage.setItem('details-item', JSON.stringify(item));
    this.router.navigate(['/detail', this.slugify(item.title)]);
  }

  slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^\w\-]+/g, '');
  }
}
