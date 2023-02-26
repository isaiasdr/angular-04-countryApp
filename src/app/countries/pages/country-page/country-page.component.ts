import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  country?: Country;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode(id))
      )
      .subscribe( ( country ) => {

        if (!country) return this.router.navigateByUrl('')

        return this.country = country;
      });
  }
}
