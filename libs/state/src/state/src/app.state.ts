import { signal, WritableSignal } from "@angular/core";
import { RoleModel, UserRoleModel } from '@domain/lib/user-management';
import { FiscalYearModel} from '@domain/lib/stockroom';
import { AttachmentConfigModel} from '@domain/lib/document-management';
import { Metadata } from '@view/lib/models';
import { ClMenuItem } from '@sadad/component-lib/src/models';


export interface AppState {
  readonly loggedInUser$: WritableSignal<UserRoleModel | null>,
  readonly loggedInUserRoles$: WritableSignal<RoleModel[]>,
  readonly isIdle$: WritableSignal<boolean>,
  readonly menuItems$: WritableSignal<ClMenuItem[]>,
  readonly fiscalPeriodsList$: WritableSignal<FiscalYearModel[]>
  readonly activeFiscalPeriod$: WritableSignal<FiscalYearModel | null>
  readonly darkMode$: WritableSignal<boolean>,
  readonly pageMetadata$: WritableSignal<Metadata>,
  readonly fileAttachmentConfig$: WritableSignal<AttachmentConfigModel>,
}

export const appInitialState: AppState = {
  loggedInUser$: signal<UserRoleModel>({}),
  loggedInUserRoles$: signal<RoleModel[]>([]),
  isIdle$: signal<boolean>(false),
  menuItems$: signal<ClMenuItem[]>([]),
  activeFiscalPeriod$: signal<FiscalYearModel | null>(null),
  fiscalPeriodsList$: signal<FiscalYearModel[]>([]),
  darkMode$: signal<boolean>(false),
  pageMetadata$: signal<Metadata>({}),
  fileAttachmentConfig$: signal<AttachmentConfigModel>({
    fileType: 'application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, .pdf, .doc, .docx .xlsx, image/jpeg, image/jpg, image/png',
    maximumNumberOfFile: 5,
    maxUploadSize: 5000000
  })
} as const;
