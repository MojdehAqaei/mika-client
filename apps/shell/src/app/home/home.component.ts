import { Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModules } from '@view/lib//values';
import { AnnouncementComponent, HeadingComponent } from '@view/lib/components';
import { ClUserInfoCardComponent } from '@sadad/component-lib/src/lib/user-info-card';
import { ClMessage } from '@sadad/component-lib/src/models';
import { AppFacade } from '@state/lib/facade';
import { ClLinkComponent } from '@sadad/component-lib/src/lib/link';

@Component({
  selector: 'inv-home',
  standalone: true,
  imports: [
    CommonModules,
    AnnouncementComponent,
    ClUserInfoCardComponent,
    HeadingComponent,
    ClLinkComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: 'home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  readonly appFacade = inject(AppFacade);

  announcements: ClMessage[] = [
    {
      type: 'warning',
      // date: '1402/12/23',
      summary: 'اعلام مهلت انجام کلیه عملیات اثاثیه مربوط به سال 1401',
      detail: 'کاربر گرامی: بر اساس تصمیمات موخده، به اطلاع می‌رساند، با عنایت به انجام عملیات دخیره گیری استهلاک در تاریخ 1401/12/28 مهلت انجام کلیه عملیات مربوط به سال جاری تا پایان وقت اداری 1401/12/27 می‌باشد.'
    },
    {
      type: 'info',
      // date: '1402/12/23',
      summary: 'اعلام مهلت انجام کلیه عملیات اثاثیه مربوط به سال 1401',
      detail: 'کاربر گرامی: بر اساس تصمیمات موخده، به اطلاع می‌رساند، با عنایت به انجام عملیات دخیره گیری استهلاک در تاریخ 1401/12/28 مهلت انجام کلیه عملیات مربوط به سال جاری تا پایان وقت اداری 1401/12/27 می‌باشد.'
    },
    {
      type: 'help',
      // date: '1402/12/23',
      summary: 'اعلام مهلت انجام کلیه عملیات اثاثیه مربوط به سال 1401',
      detail: 'کاربر گرامی: بر اساس تصمیمات موخده، به اطلاع می‌رساند، با عنایت به انجام عملیات دخیره گیری استهلاک در تاریخ 1401/12/28 مهلت انجام کلیه عملیات مربوط به سال جاری تا پایان وقت اداری 1401/12/27 می‌باشد.'
    }
  ]
}
