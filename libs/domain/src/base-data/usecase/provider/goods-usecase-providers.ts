import { GoodsGateway } from '../../gateway/goods.gateway';
import { GetGoodsUseCase } from '../get-goods.usecase';
import { SaveGoodsUseCase } from '../save.goods.usecase';
import { UpdateGoodsUseCase } from '../update.goods.usecase';
import { DeleteGoodsUseCase } from '../delete-goods.usecase';
import { GetGoodsByIdUseCase } from '../get-goods-by-id.usecase';
import { GetActiveGoodsBySearchKeyUseCase } from '../get-active-goods-by-search-key.usecase';

const GetGoodsUseCaseFactory = () => new GetGoodsUseCase();
export const GetGoodsUseCaseProvider = {
  provide: GetGoodsUseCase,
  useFactory: GetGoodsUseCaseFactory,
  deps: [GoodsGateway]
};


const GetActiveGoodsBySearchKeyUseCaseFactory = () => new GetActiveGoodsBySearchKeyUseCase();
export const getActiveGoodsBySearchKeyUseCaseProvider = {
  provide: GetActiveGoodsBySearchKeyUseCase,
  useFactory: GetActiveGoodsBySearchKeyUseCaseFactory,
  deps: [GoodsGateway]
};


const GetGoodsByIdUseCaseFactory = () => new GetGoodsByIdUseCase();
export const GetGoodsByIdUseCaseProvider = {
  provide: GetGoodsByIdUseCase,
  useFactory: GetGoodsByIdUseCaseFactory,
  deps: [GoodsGateway]
};


const SaveGoodsUseCaseFactory = () => new SaveGoodsUseCase();
export const SaveGoodsUseCaseProvider = {
  provide: SaveGoodsUseCase,
  useFactory: SaveGoodsUseCaseFactory,
  deps: [GoodsGateway]
};


const UpdateGoodsUseCaseFactory = () => new UpdateGoodsUseCase();
export const UpdateGoodsUseCaseProvider = {
  provide: UpdateGoodsUseCase,
  useFactory: UpdateGoodsUseCaseFactory,
  deps: [GoodsGateway]
};


const DeleteGoodsUseCaseFactory = () => new DeleteGoodsUseCase();
export const DeleteGoodsUseCaseProvider = {
  provide: DeleteGoodsUseCase,
  useFactory: DeleteGoodsUseCaseFactory,
  deps: [GoodsGateway]
};
