import { GetGoodsGroupTreeUseCase } from '../get-goods-group-tree.usecase';
import { GoodsGroupGateway } from '../../gateway/goods.group.gateway';
import { GetGoodsGroupChildrenByIdUseCase } from '../get-goods-group-children-by-id.usecase';
import { SaveGoodsGroupUseCase } from '../save-goods-group.usecase';
import { GenerateGoodsGroupCodeUseCase } from '../generate-goods-group-code.usecase';
import { DeleteGoodsGroupUseCase } from '../delete-goods-group.usecase';
import { UpdateGoodsGroupUseCase } from '../update-goods-group.usecase';
import { GetGoodsGroupFeaturesByIdUseCase } from '../get-goods-group-features-by-id.usecase';
import { GoodsGroupFeatureGateway } from '../../gateway/goods-group-feature.gateway';
import { SaveGoodsGroupFeaturesUseCase } from '../save-goods-group-features.usecase';



const GetGoodsGroupTreeUseCaseFactory = () => new GetGoodsGroupTreeUseCase();
export const GetGoodsGroupTreeUseCaseProvider = {
  provide: GetGoodsGroupTreeUseCase,
  useFactory: GetGoodsGroupTreeUseCaseFactory,
  deps: [GoodsGroupGateway]
};


const GetGoodsGroupChildrenByIdUseCaseFactory = () => new GetGoodsGroupChildrenByIdUseCase();
export const GetGoodsGroupChildrenByIdUseCaseProvider = {
  provide: GetGoodsGroupChildrenByIdUseCase,
  useFactory: GetGoodsGroupChildrenByIdUseCaseFactory,
  deps: [GoodsGroupGateway]
};


const GenerateGoodsGroupCodeUseCaseFactory = () => new GenerateGoodsGroupCodeUseCase();
export const GenerateGoodsGroupCodeUseCaseProvider = {
  provide: GenerateGoodsGroupCodeUseCase,
  useFactory: GenerateGoodsGroupCodeUseCaseFactory,
  deps: [GoodsGroupGateway]
};


const SaveGoodsGroupFeaturesUseCaseFactory = () => new SaveGoodsGroupFeaturesUseCase();
export const SaveGoodsGroupFeaturesUseCaseProvider = {
  provide: SaveGoodsGroupFeaturesUseCase,
  useFactory: SaveGoodsGroupFeaturesUseCaseFactory,
  deps: [GoodsGroupGateway]
};

const SaveGoodsGroupUseCaseFactory = () => new SaveGoodsGroupUseCase();
export const SaveGoodsGroupUseCaseProvider = {
  provide: SaveGoodsGroupUseCase,
  useFactory: SaveGoodsGroupUseCaseFactory,
  deps: [GoodsGroupGateway]
};


const UpdateGoodsGroupUseCaseFactory = () => new UpdateGoodsGroupUseCase();
export const UpdateGoodsGroupUseCaseProvider = {
  provide: UpdateGoodsGroupUseCase,
  useFactory: UpdateGoodsGroupUseCaseFactory,
  deps: [GoodsGroupGateway]
};


const DeleteGoodsGroupUseCaseFactory = () => new DeleteGoodsGroupUseCase();
export const DeleteGoodsGroupUseCaseProvider = {
  provide: DeleteGoodsGroupUseCase,
  useFactory: DeleteGoodsGroupUseCaseFactory,
  deps: [GoodsGroupGateway]
};



const GetGoodsGroupFeaturesByIdUseCaseFactory = () => new GetGoodsGroupFeaturesByIdUseCase();
export const GetGoodsGroupFeaturesByIdUseCaseProvider = {
  provide: GetGoodsGroupFeaturesByIdUseCase,
  useFactory: GetGoodsGroupFeaturesByIdUseCaseFactory,
  deps: [GoodsGroupFeatureGateway]
};

