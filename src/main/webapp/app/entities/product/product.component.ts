import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IProduct } from '@/shared/model/product.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import JhiDataUtils from '@/shared/data/data-utils.service';

import ProductService from './product.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Product extends mixins(JhiDataUtils, AlertMixin) {
  @Inject('productService') private productService: () => ProductService;
  private removeId: number = null;

  public products: IProduct[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllProducts();
  }

  public clear(): void {
    this.retrieveAllProducts();
  }

  public retrieveAllProducts(): void {
    this.isFetching = true;

    this.productService()
      .retrieve()
      .then(
        res => {
          this.products = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IProduct): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeProduct(): void {
    this.productService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jHipsterApp.product.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllProducts();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
