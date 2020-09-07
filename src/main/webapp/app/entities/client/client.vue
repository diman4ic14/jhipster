<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('jHipsterApp.client.home.title')" id="client-heading">Clients</span>
            <router-link :to="{name: 'ClientCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-client">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('jHipsterApp.client.home.createLabel')">
                    Create a new Client
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
        <div class="alert alert-warning" v-if="!isFetching && clients && clients.length === 0">
            <span v-text="$t('jHipsterApp.client.home.notFound')">No clients found</span>
        </div>
        <div class="table-responsive" v-if="clients && clients.length > 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('jHipsterApp.client.lastName')">Last Name</span></th>
                    <th><span v-text="$t('jHipsterApp.client.firstName')">First Name</span></th>
                    <th><span v-text="$t('jHipsterApp.client.middleName')">Middle Name</span></th>
                    <th><span v-text="$t('jHipsterApp.client.age')">Age</span></th>
                    <th><span v-text="$t('jHipsterApp.client.phone')">Phone</span></th>
                    <th><span v-text="$t('jHipsterApp.client.email')">Email</span></th>
                    <th><span v-text="$t('jHipsterApp.client.photo')">Photo</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="client in clients"
                    :key="client.id">
                    <td>
                        <router-link :to="{name: 'ClientView', params: {clientId: client.id}}">{{client.id}}</router-link>
                    </td>
                    <td>{{client.lastName}}</td>
                    <td>{{client.firstName}}</td>
                    <td>{{client.middleName}}</td>
                    <td>{{client.age}}</td>
                    <td>{{client.phone}}</td>
                    <td>{{client.email}}</td>
                    <td>
                        <a v-if="client.photo" v-on:click="openFile(client.photoContentType, client.photo)">
                            <img v-bind:src="'data:' + client.photoContentType + ';base64,' + client.photo" style="max-height: 30px;" alt="client image"/>
                        </a>
                        <span v-if="client.photo">{{client.photoContentType}}, {{byteSize(client.photo)}}</span>
                    </td>
                    <td class="text-right">
                        <div class="btn-group">
                            <router-link :to="{name: 'ClientView', params: {clientId: client.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ClientEdit', params: {clientId: client.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(client)"
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
            <span slot="modal-title"><span id="jHipsterApp.client.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-client-heading" v-text="$t('jHipsterApp.client.delete.question', {'id': removeId})">Are you sure you want to delete this Client?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-client" v-text="$t('entity.action.delete')" v-on:click="removeClient()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./client.component.ts">
</script>
