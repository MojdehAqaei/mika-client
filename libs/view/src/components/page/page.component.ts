import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Metadata } from '../../models';
import { ClPageComponent } from '@sadad/component-lib/src/lib/page';

@Component({
  selector: 'view-page',
  standalone: true,
  imports: [ClPageComponent],
  templateUrl: './page.component.html',
})
export class PageComponent {
  @Input() type?: 'error' | 'not found' | 'access denied' | 'loading' | 'empty';

  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  constructor() {

    /** takeUntilDestroyed() can only be used within an injection context */
    this.#route.data.pipe(takeUntilDestroyed()).subscribe((data: Metadata) => this.type = data.type );
  }

  goToHomePage() {
    this.#router.navigate(['/']);
  }
}
