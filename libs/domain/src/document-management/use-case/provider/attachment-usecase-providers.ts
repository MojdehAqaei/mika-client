import { AttachmentGateway } from '../../gateway/attachment.gateway';
import { GetAllFilesUseCase } from '../get-all-files.usecase';
import { GetFileUseCase } from '../get-file.usecase';


const getFileUseCaseFactory = () => new GetFileUseCase();
export const getFileUseCaseProvider = {
  provide: GetFileUseCase,
  useFactory: getFileUseCaseFactory,
  deps: [AttachmentGateway]
};

const getAllFilesUseCaseFactory = () => new GetAllFilesUseCase();
export const getAllFilesUseCaseProvider = {
  provide: GetAllFilesUseCase,
  useFactory: getAllFilesUseCaseFactory,
  deps: [AttachmentGateway]
};
