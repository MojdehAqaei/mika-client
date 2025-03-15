import { Observable } from 'rxjs';
import { GoodsGroupFeatureModel } from '@domain/lib/base-data';

export abstract class GoodsGroupFeatureGateway {
  abstract getGoodsGroupFeaturesById(id: number): Observable<GoodsGroupFeatureModel[]>;
  abstract saveGoodsGroupFeatures(list: GoodsGroupFeatureModel[]): Observable<any>;
}
