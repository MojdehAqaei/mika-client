import { StockroomGateway } from '../../gateway/stockroom.gateway';
import { GetStockroomsUseCase } from '../get-stockrooms.usecase';
import { DeleteStockroomUseCase } from '../delete-stockroom.usecase';
import { SaveStockroomUseCase } from '../save-stockroom.usecase';
import { UpdateStockroomUseCase } from '../update-stockroom.usecase';
import { FilterStockroomsByFiscalPeriodIdUseCase } from '../filter-stockrooms-by-fiscal-period-id.usecase';

const getStockroomsUseCaseFactory = () => new GetStockroomsUseCase();
export const getStockroomsUseCaseProvider = {
  provide: GetStockroomsUseCase,
  useFactory: getStockroomsUseCaseFactory,
  deps: [StockroomGateway]
}


const deleteStockroomUseCaseFactory = () => new DeleteStockroomUseCase();
export const deleteStockroomUseCaseProvider = {
  provide: DeleteStockroomUseCase,
  useFactory: deleteStockroomUseCaseFactory,
  deps: [StockroomGateway]
}



const saveStockroomUseCaseFactory = () => new SaveStockroomUseCase();
export const saveStockroomUseCaseProvider = {
  provide: SaveStockroomUseCase,
  useFactory: saveStockroomUseCaseFactory,
  deps: [StockroomGateway]
}



const updateStockroomUseCaseFactory = () => new UpdateStockroomUseCase();
export const updateStockroomUseCaseProvider = {
  provide: UpdateStockroomUseCase,
  useFactory: updateStockroomUseCaseFactory,
  deps: [StockroomGateway]
}


const FilterStockroomsByFiscalPeriodIdUseCaseFactory = () => new FilterStockroomsByFiscalPeriodIdUseCase();
export const filterStockroomsByFiscalPeriodIdUseCaseProvider = {
  provide: FilterStockroomsByFiscalPeriodIdUseCase,
  useFactory: FilterStockroomsByFiscalPeriodIdUseCaseFactory,
  deps: [StockroomGateway]
}
