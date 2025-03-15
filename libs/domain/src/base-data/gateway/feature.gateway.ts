import { FeatureModel } from '@domain/lib/base-data';
import { Gateway } from '../../gateway';

export abstract class FeatureGateway extends Gateway<FeatureModel>{
}
