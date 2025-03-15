import { inject, Injectable } from '@angular/core';
import { FeatureStore } from '../../store';
import {
  FeatureModel,
  SaveFeatureUseCase,
  SearchFeaturesUseCase,
  UpdateFeatureUseCase,
  DeleteFeatureUseCase,
  GetFeatureByIdUseCase,
  FeatureModelFilter,
  featureFilterDataMapper
} from '@domain/lib/base-data';
import { Cache, ErrorLogger } from '@sadad/component-lib/src/decorators';
import { Crud } from "@view/lib/data-types";

@Injectable()
export class FeatureFacade {
  public featureStore = inject(FeatureStore);

  #getFeaturesUseCase = inject(SearchFeaturesUseCase);
  #getFeatureByIdUseCase = inject(GetFeatureByIdUseCase);
  #saveFeatureUseCase = inject(SaveFeatureUseCase);
  #updateFeatureUseCase = inject(UpdateFeatureUseCase);
  #deleteFeatureUseCase = inject(DeleteFeatureUseCase);

  constructor() {
    this.featureStore.updatePageNumber(0);
  }

  @Cache()
  updateFeatureTableData(filters: FeatureModel) {
    this.#getFeaturesUseCase.execute(filters).subscribe((data: FeatureModel[]) => {
      this.featureStore.updateFeatures(data);
      data?.length && data[0].totalElements ? this.featureStore.updateTotal(data[0].totalElements) : '';

      // update search filter labels
      const tmp: string[] = [];
      Object.keys(filters).forEach(each => {
        if (filters[each as FeatureModelFilter] != undefined && featureFilterDataMapper.has(each as FeatureModelFilter)) {
          tmp.push(featureFilterDataMapper.get(each as FeatureModelFilter)|| '');
        }
      })
      this.featureStore.updateSearchFilterLabels(tmp);
    });
  }

  toggleEditMode(editMode: boolean) {
    this.featureStore.updateEditMode(editMode);
  }

  toggleDialogVisibility(visible: boolean) {
    this.featureStore.updateDialogVisibility(visible);
  }

  updatePage(pageSize: number, pageNumber: number) {
    this.featureStore.updatePageSize(pageSize);
    this.featureStore.updatePageNumber(pageNumber);
  }

  updateFeatureDetails(id: number) {
    this.featureStore.updateDialogLoading(true);
    this.#getFeatureByIdUseCase.execute(id).subscribe({
      next: (res) => {
        this.featureStore.updateSelectedFeature(res);
        this.featureStore.updateDialogLoading(false);
      },
      error: () => {
        this.featureStore.updateDialogLoading(false);
      }
    });
  }

  @ErrorLogger()
  saveFeature(goodsFeature: FeatureModel) {
    this.featureStore.updateDialogLoading(true);
    this.#saveFeatureUseCase.execute(goodsFeature).subscribe({
      next: (res) => {
        // adding the new goods feature to the list
        const total = this.featureStore.state$().total$();
        const list = this.featureStore.state$().features$();
        list.push(res);
        this.featureStore.updateFeatures([...list]);

        this.featureStore.updateDialogLoading(false);
        this.featureStore.updateDialogVisibility(false);
        this.featureStore.updateTotal(total + 1);
      },
      error: () => {
        this.featureStore.updateDialogLoading(false);
      }
    });
  }

  @ErrorLogger()
  updateFeature(goodsFeature: FeatureModel) {
    this.featureStore.updateDialogLoading(true);
    this.#updateFeatureUseCase.execute(goodsFeature).subscribe({
      next: (res) => {
        // updating the selected counting unit in the list
        const list = this.featureStore.state$().features$();
        const index = list.findIndex(i => i.id == res.id);
        list.splice(index, 1, res);
        this.featureStore.updateFeatures([...list]);

        this.featureStore.updateDialogLoading(false);
        this.featureStore.updateDialogVisibility(false);
      },
      error: () => {
        this.featureStore.updateDialogLoading(false);
      }
    });
  }

  @ErrorLogger()
  deleteFeature(id: number) {
    this.#deleteFeatureUseCase.execute(id).subscribe(() => {
      // removing the deleted counting unit from the list
      const total = this.featureStore.state$().total$();
      const list = this.featureStore.state$().features$();
      const index = list.findIndex(i => i.id == id);
      list.splice(index, 1);
      this.featureStore.updateFeatures([...list]);
      this.featureStore.updateTotal(total - 1);
    })
  }

  updateSelectedFeature(feature: FeatureModel) {
    this.featureStore.updateSelectedFeature(feature);
  }

  updateAllowedActions(actions: (Crud | undefined)[]) {
    this.featureStore.updateAllowedActions(actions);
  }
}
