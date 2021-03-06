<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jHipsterApp.product.home.title')" id="product-heading">Products</span>
            <router-link :to="{name: 'ProductCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-product">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jHipsterApp.product.home.createLabel')">
                    Create a new Product
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="alert alert-warning" v-if="!isFetching && products && products.length === 0">
            <span v-text="$t('jHipsterApp.product.home.notFound')">No products found</span>
        </div>
        <div class="table-responsive" v-if="products && products.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jHipsterApp.product.name')">Name</span></th>
                    <th><span v-text="$t('jHipsterApp.product.price')">Price</span></th>
                    <th><span v-text="$t('jHipsterApp.product.photo')">Photo</span></th>
                    <th><span v-text="$t('jHipsterApp.product.category')">Category</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products"
                    :key="product.id">
                    <td>
                        <router-link :to="{name: 'ProductView', params: {productId: product.id}}">{{product.id}}</router-link>
                    </td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}}</td>
                    <td>
                        <a v-if="product.photo" v-on:click="openFile(product.photoContentType, product.photo)">
                            <img v-bind:src="'data:' + product.photoContentType + ';base64,' + product.photo" style="max-height: 30px;" alt="product image"/>
                        </a>
                        <span v-if="product.photo">{{product.photoContentType}}, {{byteSize(product.photo)}}</span>
                    </td>
                    <td>
                        <span v-for="(category, i) in product.categories" :key="category.id">{{i > 0 ? ', ' : ''}}
                            <router-link class="form-control-static" :to="{name: 'CategoryView', params: {categoryId: category.id}}">{{category.name}}</router-link>
                        </span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ProductView', params: {productId: product.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProductEdit', params: {productId: product.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(product)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="jHipsterApp.product.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-product-heading" v-text="$t('jHipsterApp.product.delete.question', {'id': removeId})">Are you sure you want to delete this Product?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-product" v-text="$t('entity.action.delete')" v-on:click="removeProduct()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./product.component.ts">
</script>
