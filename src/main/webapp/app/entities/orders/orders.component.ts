import { mixins } from 'vue-class-component';

import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IOrders } from '@/shared/model/orders.model';
import AlertMixin from '@/shared/alert/alert.mixin';

import OrdersService from './orders.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Orders extends mixins(AlertMixin) {
  @Inject('ordersService') private ordersService: () => OrdersService;
  private removeId: number = null;

  public orders: IOrders[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllOrderss();
  }

  public clear(): void {
    this.retrieveAllOrderss();
  }

  public retrieveAllOrderss(): void {
    this.isFetching = true;

    this.ordersService()
      .retrieve()
      .then(
        res => {
          this.orders = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
        }
      );
  }

  public prepareRemove(instance: IOrders): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeOrders(): void {
    this.ordersService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('jHipsterApp.orders.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();
        this.removeId = null;
        this.retrieveAllOrderss();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
