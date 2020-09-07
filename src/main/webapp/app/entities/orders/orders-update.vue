<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jHipsterApp.orders.home.createOrEditLabel" v-text="$t('jHipsterApp.orders.home.createOrEditLabel')">Create or edit a Orders</h2>
                <div>
                    <div class="form-group" v-if="orders.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="orders.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.orders.date')" for="orders-date">Date</label>
                        <b-input-group class="mb-3">
                            <b-input-group-prepend>
                                <b-form-datepicker
                                    aria-controls="orders-date"
                                    v-model="$v.orders.date.$model"
                                    name="date"
                                    class="form-control"
                                    :locale="currentLanguage"
                                    button-only
                                    today-button
                                    reset-button
                                    close-button
                                >
                                </b-form-datepicker>
                            </b-input-group-prepend>
                            <b-form-input id="orders-date" type="text" class="form-control" name="date"  :class="{'valid': !$v.orders.date.$invalid, 'invalid': $v.orders.date.$invalid }"
                            v-model="$v.orders.date.$model"  required />
                        </b-input-group>
                        <div v-if="$v.orders.date.$anyDirty && $v.orders.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orders.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.orders.amount')" for="orders-amount">Amount</label>
                        <input type="number" class="form-control" name="amount" id="orders-amount"
                            :class="{'valid': !$v.orders.amount.$invalid, 'invalid': $v.orders.amount.$invalid }" v-model.number="$v.orders.amount.$model"  required/>
                        <div v-if="$v.orders.amount.$anyDirty && $v.orders.amount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orders.amount.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orders.amount.min" v-text="$t('entity.validation.min', {min: 1})">
                                This field should be at least 1.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orders.amount.max" v-text="$t('entity.validation.max', {max: 10})">
                                This field cannot be longer than 10 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orders.amount.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.orders.client')" for="orders-client">Client</label>
                        <select class="form-control" id="orders-client" name="client" v-model="orders.client">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="orders.client && clientOption.id === orders.client.id ? orders.client : clientOption" v-for="clientOption in clients" :key="clientOption.id">{{clientOption.email}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.orders.product')" for="orders-product">Product</label>
                        <select class="form-control" id="orders-product" name="product" v-model="orders.product">
                            <option v-bind:value="null"></option>
                            <option v-bind:value="orders.product && productOption.id === orders.product.id ? orders.product : productOption" v-for="productOption in products" :key="productOption.id">{{productOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.orders.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./orders-update.component.ts">
</script>
