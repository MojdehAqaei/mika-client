import { GetFiscalYearPerStockroomListUseCase } from '../get-fiscal-year-per-stockroom-list.usecase';
import { FiscalYearPerStockroomGateway } from '../../gateway/fiscal-year-per-stockroom.gateway';
import { SaveFiscalYearPerStockroomUseCase } from '../save-fiscal-year-per-stockroom.usecase';
import { UpdateFiscalYearPerStockroomUseCase } from '../update-fiscal-year-per-stockroom.usecase';
import { DeleteFiscalYearPerStockroomUseCase } from '../delete-fiscal-year-per-stockroom.usecase';

const getFiscalYearPerStockroomListUseCaseFactory = () => new GetFiscalYearPerStockroomListUseCase();
export const getFiscalYearPerStockroomListUseCaseProvider = {
  provide: GetFiscalYearPerStockroomListUseCase,
  useFactory: getFiscalYearPerStockroomListUseCaseFactory,
  deps: [FiscalYearPerStockroomGateway]
}



const saveFiscalYearPerStockroomUseCaseFactory = () => new SaveFiscalYearPerStockroomUseCase();
export const saveFiscalYearPerStockroomUseCaseProvider = {
  provide: SaveFiscalYearPerStockroomUseCase,
  useFactory: saveFiscalYearPerStockroomUseCaseFactory,
  deps: [FiscalYearPerStockroomGateway]
}



const updateFiscalYearPerStockroomUseCaseFactory = () => new UpdateFiscalYearPerStockroomUseCase();
export const updateFiscalYearPerStockroomUseCaseProvider = {
  provide: UpdateFiscalYearPerStockroomUseCase,
  useFactory: updateFiscalYearPerStockroomUseCaseFactory,
  deps: [FiscalYearPerStockroomGateway]
}



const deleteFiscalYearPerStockroomUseCaseFactory = () => new DeleteFiscalYearPerStockroomUseCase();
export const deleteFiscalYearPerStockroomUseCaseProvider = {
  provide: DeleteFiscalYearPerStockroomUseCase,
  useFactory: deleteFiscalYearPerStockroomUseCaseFactory,
  deps: [FiscalYearPerStockroomGateway]
}

