import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import ClientService from '../client/client.service';
import { IClient } from '@/shared/model/client.model';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import AlertService from '@/shared/alert/alert.service';
import { IOrders, Orders } from '@/shared/model/orders.model';
import OrdersService from './orders.service';

const validations: any = {
  orders: {
    date: {
      required,
    },
    amount: {
      required,
      numeric,
      min: minValue(1),
      max: maxValue(10),
    },
  },
};

@Component({
  validations,
})
export default class OrdersUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('ordersService') private ordersService: () => OrdersService;
  public orders: IOrders = new Orders();

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.ordersId) {
        vm.retrieveOrders(to.params.ordersId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.orders.id) {
      this.ordersService()
        .update(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.orders.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.ordersService()
        .create(this.orders)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.orders.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveOrders(ordersId): void {
    this.ordersService()
      .find(ordersId)
      .then(res => {
        this.orders = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
  }
}
