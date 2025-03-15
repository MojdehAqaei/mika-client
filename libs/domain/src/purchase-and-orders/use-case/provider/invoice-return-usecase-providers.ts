import { InvoiceReturnGateway } from '../../gateway/invoice-return.gateway';
import { ChangeInvoiceReturnStateUseCase } from '../change-invoice-return-state.usecase';
import { DeleteInvoiceReturnUseCase } from '../delete-invoice-return.usecase';
import { GetInvoiceReturnListUseCase } from '../get-invoice-return-list.usecase';
import { SaveInvoiceReturnUseCase } from '../save-invoice-return.usecase';
import { UpdateInvoiceReturnUseCase } from '../update-invoice-return.usecase';

const getInvoiceReturnListUseCaseFactory = () =>
    new GetInvoiceReturnListUseCase();
export const getInvoiceReturnListUseCaseProvider = {
    provide: GetInvoiceReturnListUseCase,
    useFactory: getInvoiceReturnListUseCaseFactory,
    deps: [InvoiceReturnGateway],
};

const deleteInvoiceReturnUseCaseFactory = () =>
    new DeleteInvoiceReturnUseCase();
export const deleteInvoiceReturnUseCaseProvider = {
    provide: DeleteInvoiceReturnUseCase,
    useFactory: deleteInvoiceReturnUseCaseFactory,
    deps: [InvoiceReturnGateway],
};

const saveInvoiceReturnUseCaseFactory = () =>
    new SaveInvoiceReturnUseCase();
export const saveInvoiceReturnUseCaseProvider = {
    provide: SaveInvoiceReturnUseCase,
    useFactory: saveInvoiceReturnUseCaseFactory,
    deps: [InvoiceReturnGateway],
};

const updateInvoiceReturnUseCaseFactory = () =>
    new UpdateInvoiceReturnUseCase();
export const updateInvoiceReturnUseCaseProvider = {
    provide: UpdateInvoiceReturnUseCase,
    useFactory: updateInvoiceReturnUseCaseFactory,
    deps: [InvoiceReturnGateway],
};


const updateInvoiceReturnStateUseCaseFactory = () =>
    new ChangeInvoiceReturnStateUseCase();
export const updateInvoiceReturnStateUseCaseProvider = {
    provide: ChangeInvoiceReturnStateUseCase,
    useFactory: updateInvoiceReturnStateUseCaseFactory,
    deps: [InvoiceReturnGateway],
};
