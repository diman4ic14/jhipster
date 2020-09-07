import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import CategoryService from '../category/category.service';
import { ICategory } from '@/shared/model/category.model';

import AlertService from '@/shared/alert/alert.service';
import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';

const validations: any = {
  product: {
    name: {
      required,
    },
    price: {
      required,
      numeric,
      min: minValue(0.1),
    },
    photo: {},
  },
};

@Component({
  validations,
})
export default class ProductUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productService') private productService: () => ProductService;
  public product: IProduct = new Product();

  @Inject('categoryService') private categoryService: () => CategoryService;

  public categories: ICategory[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
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
    this.product.categories = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.product.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.product.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        this.product = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.product && field && fieldContentType) {
      if (this.product.hasOwnProperty(field)) {
        this.product[field] = null;
      }
      if (this.product.hasOwnProperty(fieldContentType)) {
        this.product[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.categoryService()
      .retrieve()
      .then(res => {
        this.categories = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
