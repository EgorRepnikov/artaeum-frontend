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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    const { queryParams } = await this.route.snapshot
    this.query = queryParams['query']
  }

  onSubmit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.query }
    })
  }
}
