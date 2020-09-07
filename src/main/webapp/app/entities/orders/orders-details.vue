<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="orders">
                <h2 class="jh-entity-heading"><span v-text="$t('jHipsterApp.orders.detail.title')">Orders</span> {{orders.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jHipsterApp.orders.date')">Date</span>
                    </dt>
                    <dd>
                        <span>{{orders.date}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.orders.amount')">Amount</span>
                    </dt>
                    <dd>
                        <span>{{orders.amount}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.orders.client')">Client</span>
                    </dt>
                    <dd>
                        <div v-if="orders.client">
                            <router-link :to="{name: 'ClientView', params: {clientId: orders.client.id}}">{{orders.client.email}}</router-link>
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.orders.product')">Product</span>
                    </dt>
                    <dd>
                        <div v-if="orders.product">
                            <router-link :to="{name: 'ProductView', params: {productId: orders.product.id}}">{{orders.product.name}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="orders.id" :to="{name: 'OrdersEdit', params: {ordersId: orders.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./orders-details.component.ts">
</script>
