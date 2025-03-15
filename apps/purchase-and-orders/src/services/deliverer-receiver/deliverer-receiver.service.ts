import { inject, Injectable } from '@angular/core';
import { OrganizationTypeEnum } from '@domain/lib/organization';
import { GoodsDeliveryBaseDocumentTypeEnum, GoodsDeliveryTypeEnum } from '@domain/lib/purchase-and-orders';
import { TranslateService } from '@ngx-translate/core';

export const organizationContainTypes = `${OrganizationTypeEnum.EDARE_OMOOR},${OrganizationTypeEnum.EDARE_KOL},${OrganizationTypeEnum.AZMAYESHGAH},${OrganizationTypeEnum.BANK_KARGOSHAEI},${OrganizationTypeEnum.BIMARESTAN},${OrganizationTypeEnum.DAROUKHANEH},${OrganizationTypeEnum.DANESHKADE},${OrganizationTypeEnum.DARMANGAH},${OrganizationTypeEnum.AZMAYESHGAH},${OrganizationTypeEnum.SARPARASTY},${OrganizationTypeEnum.SHOBE_SHOBE},${OrganizationTypeEnum.SHOBE_SANDOGH},${OrganizationTypeEnum.SHOBE_KARGOSHAEI},${OrganizationTypeEnum.SHOBE_MOSTAGHEL},${OrganizationTypeEnum.SANDOGH},${OrganizationTypeEnum.HEIAT_AAMEL},${OrganizationTypeEnum.MODIRIAT_OMOOR},${OrganizationTypeEnum.MARKAZ},${OrganizationTypeEnum.MOAVENAT},${OrganizationTypeEnum.MOAVENAT_MODIR_AAMEL},${OrganizationTypeEnum.VAHEDHAYE_KHAREJ}`;

@Injectable({
  providedIn: 'root'
})
export class DelivererReceiverService {
  readonly #translate = inject(TranslateService);

  public setDelivererAndReceiver(deliveryType: GoodsDeliveryTypeEnum): string[] {

    let delivererUrl;
    let delivererLabel = '';
    let receiverUrl;
    let receiverLabel = '';

    switch (deliveryType) {
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION:
        delivererUrl = 'prs-corps/search/actives';
        delivererLabel = this.#translate.instant('base-data.person-company.');
        receiverUrl = `organizations/search/actives/${organizationContainTypes}/`;
        receiverLabel = this.#translate.instant('organization');
        break;
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION:
        delivererUrl = `organizations/search/actives/${organizationContainTypes}/`;
        delivererLabel = this.#translate.instant('organization');
        receiverUrl = 'prs-corps/search/actives';
        receiverLabel = this.#translate.instant('base-data.person-company.');
        break;
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY:
        delivererUrl = 'prs-corps/search/actives';
        delivererLabel = this.#translate.instant('base-data.person-company.');
        receiverUrl = 'inventories/search/actives';
        receiverLabel = this.#translate.instant('stockroom.');
        break;
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY:
        delivererUrl = 'inventories/search/actives';
        delivererLabel = this.#translate.instant('stockroom.');
        receiverUrl = 'prs-corps/search/actives';
        receiverLabel = this.#translate.instant('base-data.person-company.');
        break;
      case GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION:
        delivererUrl = 'inventories/search/actives';
        delivererLabel = this.#translate.instant('stockroom.');
        receiverUrl = `organizations/search/actives/${organizationContainTypes}/`;
        receiverLabel = this.#translate.instant('organization');
        break;
      case GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY:
        delivererUrl = `organizations/search/actives/${organizationContainTypes}/`;
        delivererLabel = this.#translate.instant('organization');
        receiverUrl = 'inventories/search/actives';
        receiverLabel = this.#translate.instant('stockroom.');
        break;
      case GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY:
        delivererUrl = 'inventories/search/actives';
        delivererLabel = this.#translate.instant('stockroom.');
        receiverUrl = 'inventories/search/actives';
        receiverLabel = this.#translate.instant('stockroom.');
        break;
      default:
        delivererUrl = '';
        receiverUrl = '';
        break;
    }

    return [delivererUrl, delivererLabel, receiverUrl, receiverLabel];
  }

  public setBaseDocumentType(deliveryType: GoodsDeliveryTypeEnum): GoodsDeliveryBaseDocumentTypeEnum | null {
    let docType: GoodsDeliveryBaseDocumentTypeEnum | null;

    switch (deliveryType) {
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_ORGANIZATION:
        docType = GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_INVOICE;
        break;
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_ORGANIZATION:
        docType = GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_RETURN_INVOICE;
        break;
      case GoodsDeliveryTypeEnum.PURCHASE_AND_DELIVERY_TO_INVENTORY:
        docType = GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_INVOICE;
        break;
      case GoodsDeliveryTypeEnum.RETURN_PURCHASE_OF_INVENTORY:
        docType = GoodsDeliveryBaseDocumentTypeEnum.PURCHASE_RETURN_INVOICE;
        break;
      case GoodsDeliveryTypeEnum.DELIVERY_FROM_INVENTORY_TO_ORGANIZATION:
        docType = GoodsDeliveryBaseDocumentTypeEnum.GOODS_ORDER;
        break;
      case GoodsDeliveryTypeEnum.RETURN_FROM_ORGANIZATION_TO_INVENTORY:
        docType = GoodsDeliveryBaseDocumentTypeEnum.GOODS_DELIVERY;
        break;
      case GoodsDeliveryTypeEnum.TRANSFER_FROM_INVENTORY_TO_INVENTORY:
        docType = GoodsDeliveryBaseDocumentTypeEnum.GOODS_ORDER;
        break;
      default:
        docType = null;
        break;
    }

    return docType;
  }
}
