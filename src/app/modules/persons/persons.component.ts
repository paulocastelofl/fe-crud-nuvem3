import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericHttpService } from '../../services/generic-http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrl: './persons.component.scss'
})
export class PersonsComponent {

  public form!: FormGroup;
  public submitted = false;
  public typePersons: any[] = [];
  public idPerson: number | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private _service: GenericHttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.form = this.formBuilder.group({
      name: [{ value: null, disabled: false }, Validators.required],
      email: [{ value: null, disabled: false }, Validators.compose([Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      phone: [{ value: null, disabled: false }, Validators.required],
      typeperson: [{ value: null, disabled: false }, Validators.required],
    })
  }

  ngOnInit(): void {
    this.getLookupTypePersons();

    this._route.params.subscribe(params => {
      if (params['id']) {
        this.idPerson = Number(params['id']);
        this.getById();
      }
    });
  }

  get formControl() {
    return this.form.controls;
  }

  getLookupTypePersons() {
    this._service.get('type-persons').subscribe({
      next: (response) => {
        this.typePersons = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getById() {
    this._service.get(`persons/${this.idPerson}`).subscribe({
      next: (response) => {
        console.log(response)
        this.form.patchValue({
          name: response.username,
          email: response.email,
          phone: response.phone,
          typeperson: response.typeId
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSaveAndUpdate() {
    this.submitted = true;
    if (this.form.valid) {

      const parms = {
        name: this.formControl['name'].value,
        email: this.formControl['email'].value,
        phone: this.formControl['phone'].value,
        typeId: Number(this.formControl['typeperson'].value)
      }

      if (this.idPerson) {
        console.log(parms)
        this._service.put('persons', parms, this.idPerson).subscribe({
          next: (response) => {
            this._router.navigate([`/`]);
          },
          error: (error) => {
            console.log(error);
          }
        });

      } else {
        this._service.post('persons', parms).subscribe({
          next: (response) => {
            this.onReset();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
  }
}
