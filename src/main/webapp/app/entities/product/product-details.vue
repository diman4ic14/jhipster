<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="product">
                <h2 class="jh-entity-heading"><span v-text="$t('jHipsterApp.product.detail.title')">Product</span> {{product.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('jHipsterApp.product.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{product.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.product.price')">Price</span>
                    </dt>
                    <dd>
                        <span>{{product.price}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.product.photo')">Photo</span>
                    </dt>
                    <dd>
                        <div v-if="product.photo">
                            <a v-on:click="openFile(product.photoContentType, product.photo)">
                                <img v-bind:src="'data:' + product.photoContentType + ';base64,' + product.photo" style="max-width: 100%;" alt="product image"/>
                            </a>
                            {{product.photoContentType}}, {{byteSize(product.photo)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('jHipsterApp.product.category')">Category</span>
                    </dt>
                    <dd>
                        <span v-for="(category, i) in product.categories" :key="category.id">{{i > 0 ? ', ' : ''}}
                            <router-link :to="{name: 'CategoryView', params: {categoryId: category.id}}">{{category.name}}</router-link>
                        </span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="product.id" :to="{name: 'ProductEdit', params: {productId: product.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-details.component.ts">
</script>
