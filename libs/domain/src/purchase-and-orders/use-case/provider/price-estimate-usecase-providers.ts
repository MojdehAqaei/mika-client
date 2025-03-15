import { PriceEstimateGateway } from "../../gateway/price-estimate.gateway";
import { GetPriceEstimateByOrderIdUseCase } from "../get-price-estimate-by-order-id.usecase";
import { SavePriceEstimateUseCase } from "../save-price-estimate.usecase";
import { UpdatePriceEstimateUseCase } from "../update-price-estimate.usecase";

const getPriceEstimateByIdUseCaseFactory = () => new GetPriceEstimateByOrderIdUseCase();
export const getPriceEstimateByIdUseCaseProvider = {
    provide: GetPriceEstimateByOrderIdUseCase,
    useFactory: getPriceEstimateByIdUseCaseFactory,
    deps: [PriceEstimateGateway],
};

const savePriceEstimateUseCaseFactory = () => new SavePriceEstimateUseCase();
export const savePriceEstimateUseCaseProvider = {
    provide: SavePriceEstimateUseCase,
    useFactory: savePriceEstimateUseCaseFactory,
    deps: [PriceEstimateGateway],
};

const updatePriceEstimateUseCaseFactory = () => new UpdatePriceEstimateUseCase();
export const updatePriceEstimateUseCaseProvider = {
    provide: UpdatePriceEstimateUseCase,
    useFactory: updatePriceEstimateUseCaseFactory,
    deps: [PriceEstimateGateway],
};
