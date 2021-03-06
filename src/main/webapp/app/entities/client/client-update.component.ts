import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';
import { IClient, Client } from '@/shared/model/client.model';
import ClientService from './client.service';

const validations: any = {
  client: {
    lastName: {
      required,
    },
    firstName: {
      required,
    },
    middleName: {},
    age: {
      numeric,
      min: minValue(18),
      max: maxValue(80),
    },
    phone: {
      required,
    },
    email: {
      required,
    },
    photo: {},
  },
};

@Component({
  validations,
})
export default class ClientUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('clientService') private clientService: () => ClientService;
  public client: IClient = new Client();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.clientId) {
        vm.retrieveClient(to.params.clientId);
      }
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
    if (this.client.id) {
      this.clientService()
        .update(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.client.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.clientService()
        .create(this.client)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('jHipsterApp.client.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveClient(clientId): void {
    this.clientService()
      .find(clientId)
      .then(res => {
        this.client = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.client && field && fieldContentType) {
      if (this.client.hasOwnProperty(field)) {
        this.client[field] = null;
      }
      if (this.client.hasOwnProperty(fieldContentType)) {
        this.client[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {}
}
