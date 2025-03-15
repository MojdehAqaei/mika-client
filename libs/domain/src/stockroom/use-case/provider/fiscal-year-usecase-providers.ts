import { GetFiscalYearsUseCase } from '../get-fiscal-years.usecase';
import { FiscalYearGateway } from '../../gateway/fiscal-year.gateway';
import { UpdateFiscalYearUseCase } from '../update-fiscal-year.usecase';
import { SaveFiscalYearUseCase } from '../save-fiscal-year.usecase';
import { DeleteFiscalYearUseCase } from '../delete-fiscal-year.usecase';

const getAllFiscalYearsUseCaseFactory = () => new GetFiscalYearsUseCase();
export const getAllFiscalYearsUseCaseProvider = {
  provide: GetFiscalYearsUseCase,
  useFactory: getAllFiscalYearsUseCaseFactory,
  deps: [FiscalYearGateway]
}

const saveFiscalYearUseCaseFactory = () => new SaveFiscalYearUseCase();
export const saveFiscalYearUseCaseProvider = {
  provide: SaveFiscalYearUseCase,
  useFactory: saveFiscalYearUseCaseFactory,
  deps: [FiscalYearGateway]
}

const updateFiscalYearUseCaseFactory = () => new UpdateFiscalYearUseCase();
export const updateFiscalYearUseCaseProvider = {
  provide: UpdateFiscalYearUseCase,
  useFactory: updateFiscalYearUseCaseFactory,
  deps: [FiscalYearGateway]
}

const deleteFiscalYearUseCaseFactory = () => new DeleteFiscalYearUseCase();
export const deleteFiscalYearUseCaseProvider = {
  provide: DeleteFiscalYearUseCase,
  useFactory: deleteFiscalYearUseCaseFactory,
  deps: [FiscalYearGateway]
}
