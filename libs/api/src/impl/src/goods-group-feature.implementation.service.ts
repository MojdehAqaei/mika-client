import { BaseService } from '../../misc';
import { GoodsGroupFeatureGateway, GoodsGroupFeatureModel } from '@domain/lib/base-data';
import { map, Observable } from 'rxjs';
import { GoodsGroupFeatureMapper } from '../../mapper';
import { Injectable } from '@angular/core';
import { GoodsGroupFeatureDto } from '../../dto';

@Injectable({
  providedIn: 'root'
})
export class GoodsGroupFeatureImplementationService extends BaseService<GoodsGroupFeatureDto> implements GoodsGroupFeatureGateway {
  readonly #goodsGroupFeatureMapper = new GoodsGroupFeatureMapper();

  getGoodsGroupFeaturesById(goodsGroupId: number): Observable<GoodsGroupFeatureModel[]> {
    return this.getAll(`category-properties/get/${goodsGroupId}`)
      .pipe(map(res => res.map(each => this.#goodsGroupFeatureMapper.mapTo(each))));
  }

  /**
   * Save Goods Group Features
   * @param list
   */
  saveGoodsGroupFeatures(list: GoodsGroupFeatureModel[]): Observable<GoodsGroupFeatureModel[]> {
    const goodsGroupId = list[0]?.goodsGroupId;
    const body = list.map(each => this.#goodsGroupFeatureMapper.mapFrom(each));
    return this.post(`category-properties/allocate/${goodsGroupId}`, body, null, true).pipe(
      map(res => (res as GoodsGroupFeatureDto[])?.map(this.#goodsGroupFeatureMapper.mapTo))
    );
  }


}
