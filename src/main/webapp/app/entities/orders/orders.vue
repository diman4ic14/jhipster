<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jHipsterApp.orders.home.title')" id="orders-heading">Orders</span>
            <router-link :to="{name: 'OrdersCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-orders">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jHipsterApp.orders.home.createLabel')">
                    Create a new Orders
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
        <div class="alert alert-warning" v-if="!isFetching && orders && orders.length === 0">
            <span v-text="$t('jHipsterApp.orders.home.notFound')">No orders found</span>
        </div>
        <div class="table-responsive" v-if="orders && orders.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jHipsterApp.orders.date')">Date</span></th>
                    <th><span v-text="$t('jHipsterApp.orders.amount')">Amount</span></th>
                    <th><span v-text="$t('jHipsterApp.orders.client')">Client</span></th>
                    <th><span v-text="$t('jHipsterApp.orders.product')">Product</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orders in orders"
                    :key="orders.id">
                    <td>
                        <router-link :to="{name: 'OrdersView', params: {ordersId: orders.id}}">{{orders.id}}</router-link>
                    </td>
                    <td>{{orders.date}}</td>
                    <td>{{orders.amount}}</td>
                    <td>
                        <div v-if="orders.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: orders.client.id}}">{{orders.client.email}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="orders.product">
                            <router-link :to="{name: 'ProductView', params: {productId: orders.product.id}}">{{orders.product.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'OrdersView', params: {ordersId: orders.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'OrdersEdit', params: {ordersId: orders.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(orders)"
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
            <span slot="modal-title"><span id="jHipsterApp.orders.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-orders-heading" v-text="$t('jHipsterApp.orders.delete.question', {'id': removeId})">Are you sure you want to delete this Orders?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-orders" v-text="$t('entity.action.delete')" v-on:click="removeOrders()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./orders.component.ts">
</script>
