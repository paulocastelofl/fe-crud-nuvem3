import { Component } from '@angular/core';
import { GenericHttpService } from '../../services/generic-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public persons: any = [];

  constructor(private _service: GenericHttpService, private _router: Router) { }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson() {
    this._service.get('persons')
      .subscribe({
        next: (data) => {
          this.persons = data;
          console.log(this.persons);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  goToEditNewPerson(id?: number) {
    if (id !== undefined) {
      this._router.navigate([`persons/${id}`]);
    } else {
      this._router.navigate([`persons`]);
    }
  }

}
