import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Category = () => import('@/entities/category/category.vue');
// prettier-ignore
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
// prettier-ignore
const CategoryDetails = () => import('@/entities/category/category-details.vue');
// prettier-ignore
const Product = () => import('@/entities/product/product.vue');
// prettier-ignore
const ProductUpdate = () => import('@/entities/product/product-update.vue');
// prettier-ignore
const ProductDetails = () => import('@/entities/product/product-details.vue');
// prettier-ignore
const Orders = () => import('@/entities/orders/orders.vue');
// prettier-ignore
const OrdersUpdate = () => import('@/entities/orders/orders-update.vue');
// prettier-ignore
const OrdersDetails = () => import('@/entities/orders/orders-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/client',
    name: 'Client',
    component: Client,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/new',
    name: 'ClientCreate',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/edit',
    name: 'ClientEdit',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/view',
    name: 'ClientView',
    component: ClientDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/new',
    name: 'CategoryCreate',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/edit',
    name: 'CategoryEdit',
    component: CategoryUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/category/:categoryId/view',
    name: 'CategoryView',
    component: CategoryDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/new',
    name: 'ProductCreate',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/edit',
    name: 'ProductEdit',
    component: ProductUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/product/:productId/view',
    name: 'ProductView',
    component: ProductDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/new',
    name: 'OrdersCreate',
    component: OrdersUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/:ordersId/edit',
    name: 'OrdersEdit',
    component: OrdersUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/orders/:ordersId/view',
    name: 'OrdersView',
    component: OrdersDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
