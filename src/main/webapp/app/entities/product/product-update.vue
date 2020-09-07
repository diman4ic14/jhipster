<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jHipsterApp.product.home.createOrEditLabel" v-text="$t('jHipsterApp.product.home.createOrEditLabel')">Create or edit a Product</h2>
                <div>
                    <div class="form-group" v-if="product.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="product.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.product.name')" for="product-name">Name</label>
                        <input type="text" class="form-control" name="name" id="product-name"
                            :class="{'valid': !$v.product.name.$invalid, 'invalid': $v.product.name.$invalid }" v-model="$v.product.name.$model"  required/>
                        <div v-if="$v.product.name.$anyDirty && $v.product.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.product.price')" for="product-price">Price</label>
                        <input type="number" class="form-control" name="price" id="product-price"
                            :class="{'valid': !$v.product.price.$invalid, 'invalid': $v.product.price.$invalid }" v-model.number="$v.product.price.$model"  required/>
                        <div v-if="$v.product.price.$anyDirty && $v.product.price.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.price.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.price.min" v-text="$t('entity.validation.min', {min: 0.1})">
                                This field should be at least 0.1.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.price.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.product.photo')" for="product-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + product.photoContentType + ';base64,' + product.photo" style="max-height: 100px;" v-if="product.photo" alt="product image"/>
                            <div v-if="product.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{product.photoContentType}}, {{byteSize(product.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, product, 'photo', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="product-photo"
                            :class="{'valid': !$v.product.photo.$invalid, 'invalid': $v.product.photo.$invalid }" v-model="$v.product.photo.$model" />
                        <input type="hidden" class="form-control" name="photoContentType" id="product-photoContentType"
                            v-model="product.photoContentType" />
                    </div>
                    <div class="form-group">
                        <label v-text="$t('jHipsterApp.product.category')" for="product-category">Category</label>
                        <select class="form-control" id="product-category" multiple name="category" v-model="product.categories">
                            <option v-bind:value="getSelected(product.categories, categoryOption)" v-for="categoryOption in categories" :key="categoryOption.id">{{categoryOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.product.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-update.component.ts">
</script>
