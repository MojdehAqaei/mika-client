import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClLinkComponent } from '@sadad/component-lib/src/lib/link';
import { ApplicationRoutes } from '../../../data-types';
import { TranslateService } from '@ngx-translate/core';
import { ClButtonComponent } from '@sadad/component-lib/src/lib/button';

@Component({
  selector: 'view-favourites',
  standalone: true,
  imports: [CommonModule, ClLinkComponent, ClButtonComponent],
  templateUrl: './favourites.component.html',
})
export class FavouritesComponent {
  #translate = inject(TranslateService);

  links: any[] = [
    {
      href: `#/${ApplicationRoutes.inventory}/${ApplicationRoutes.userManagement}/${ApplicationRoutes.users}`,
      title: this.#translate.instant('user-management.user.add'),
      target: '_self',
      color: 'default',
      underline: 'hover',
      icon: ''
    },
    {
      href: `#/${ApplicationRoutes.inventory}/${ApplicationRoutes.userManagement}/${ApplicationRoutes.roles}`,
      title: this.#translate.instant('user-management.role.add'),
      target: '_self',
      color: 'default',
      underline: 'hover',
      icon: ''
    },
    {
      href: `#/${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.unitOfMeasure}`,
      title: this.#translate.instant('base-data.counting-unit.'),
      target: '_self',
      color: 'default',
      underline: 'hover',
      icon: ''
    },
    {
      href: `#/${ApplicationRoutes.inventory}/${ApplicationRoutes.baseData}/${ApplicationRoutes.goodsAndServices}`,
      title: this.#translate.instant('base-data.goods.add'),
      target: '_self',
      color: 'default',
      underline: 'hover',
      icon: ''
    }
  ]
}
