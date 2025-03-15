import { FeatureGateway } from '../../gateway/feature.gateway';
import { SearchFeaturesUseCase } from '../search-features.usecase';
import { SaveFeatureUseCase } from '../save-feature.usecase';
import { UpdateFeatureUseCase } from '../update-feature.usecase';
import { DeleteFeatureUseCase } from '../delete-feature.usecase';
import { GetFeatureByIdUseCase } from '../get-feature-by-id.usecase';


const SearchFeaturesUseCaseFactory = () => new SearchFeaturesUseCase();
export const SearchFeaturesUseCaseProvider = {
  provide: SearchFeaturesUseCase,
  useFactory: SearchFeaturesUseCaseFactory,
  deps: [FeatureGateway]
};


const getFeatureByIdUseCaseFactory = () => new GetFeatureByIdUseCase();
export const getFeatureByIdUseCaseProvider = {
  provide: GetFeatureByIdUseCase,
  useFactory: getFeatureByIdUseCaseFactory,
  deps: [FeatureGateway]
};



const SaveFeatureUseCaseFactory = () => new SaveFeatureUseCase();
export const SaveFeatureUseCaseProvider = {
  provide: SaveFeatureUseCase,
  useFactory: SaveFeatureUseCaseFactory,
  deps: [FeatureGateway]
};



const UpdateFeatureUseCaseFactory = () => new UpdateFeatureUseCase();
export const UpdateFeatureUseCaseProvider = {
  provide: UpdateFeatureUseCase,
  useFactory: UpdateFeatureUseCaseFactory,
  deps: [FeatureGateway]
};



const deleteFeatureUseCaseFactory = () => new DeleteFeatureUseCase();
export const deleteFeatureUseCaseProvider = {
  provide: DeleteFeatureUseCase,
  useFactory: deleteFeatureUseCaseFactory,
  deps: [FeatureGateway]
};
