import { GetCountingUnitsUseCase } from '../get-counting-units.usecase';
import { CountingUnitGateway } from '../../gateway/counting.unit.gateway';
import { SaveCountingUnitUseCase } from '../save-counting-unit.usecase';
import { UpdateCountingUnitUseCase } from '../update-counting-unit.usecase';
import { DeleteCountingUnitUseCase } from '../delete-counting-unit.usecase';
import { GetCountingUnitTypesUseCase } from '../get-counting-unit-types.usecase';


const getCountingUnitsUseCaseFactory = () => new GetCountingUnitsUseCase();
export const getCountingUnitsUseCaseProvider = {
  provide: GetCountingUnitsUseCase,
  useFactory: getCountingUnitsUseCaseFactory,
  deps: [CountingUnitGateway]
};


const getCountingUnitTypesUseCaseFactory = () => new GetCountingUnitTypesUseCase();
export const getCountingUnitTypesUseCaseProvider = {
  provide: GetCountingUnitTypesUseCase,
  useFactory: getCountingUnitTypesUseCaseFactory,
  deps: [CountingUnitGateway]
};


const SaveCountingUnitUseCaseFactory = () => new SaveCountingUnitUseCase();
export const saveCountingUnitUseCaseProvider = {
  provide: SaveCountingUnitUseCase,
  useFactory: SaveCountingUnitUseCaseFactory,
  deps: [CountingUnitGateway]
};



const UpdateCountingUnitUseCaseFactory = () => new UpdateCountingUnitUseCase();
export const updateCountingUnitUseCaseProvider = {
  provide: UpdateCountingUnitUseCase,
  useFactory: UpdateCountingUnitUseCaseFactory,
  deps: [CountingUnitGateway]
};



const deleteCountingUnitUseCaseFactory = () => new DeleteCountingUnitUseCase();
export const deleteCountingUnitUseCaseProvider = {
  provide: DeleteCountingUnitUseCase,
  useFactory: deleteCountingUnitUseCaseFactory,
  deps: [CountingUnitGateway]
};
