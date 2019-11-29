import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'ae-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title = 'Search - Artaeum'

  query: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const params = await this.activatedRoute.queryParams.toPromise()
    this.query = params['query']
  }

  onSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { query: this.query }
    })
  }
}
