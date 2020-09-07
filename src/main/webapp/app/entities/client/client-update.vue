<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jHipsterApp.client.home.createOrEditLabel" v-text="$t('jHipsterApp.client.home.createOrEditLabel')">Create or edit a Client</h2>
                <div>
                    <div class="form-group" v-if="client.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="client.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.lastName')" for="client-lastName">Last Name</label>
                        <input type="text" class="form-control" name="lastName" id="client-lastName"
                            :class="{'valid': !$v.client.lastName.$invalid, 'invalid': $v.client.lastName.$invalid }" v-model="$v.client.lastName.$model"  required/>
                        <div v-if="$v.client.lastName.$anyDirty && $v.client.lastName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.lastName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.firstName')" for="client-firstName">First Name</label>
                        <input type="text" class="form-control" name="firstName" id="client-firstName"
                            :class="{'valid': !$v.client.firstName.$invalid, 'invalid': $v.client.firstName.$invalid }" v-model="$v.client.firstName.$model"  required/>
                        <div v-if="$v.client.firstName.$anyDirty && $v.client.firstName.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.firstName.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.middleName')" for="client-middleName">Middle Name</label>
                        <input type="text" class="form-control" name="middleName" id="client-middleName"
                            :class="{'valid': !$v.client.middleName.$invalid, 'invalid': $v.client.middleName.$invalid }" v-model="$v.client.middleName.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.age')" for="client-age">Age</label>
                        <input type="number" class="form-control" name="age" id="client-age"
                            :class="{'valid': !$v.client.age.$invalid, 'invalid': $v.client.age.$invalid }" v-model.number="$v.client.age.$model" />
                        <div v-if="$v.client.age.$anyDirty && $v.client.age.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.age.min" v-text="$t('entity.validation.min', {min: 18})">
                                This field should be at least 18.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.age.max" v-text="$t('entity.validation.max', {max: 80})">
                                This field cannot be longer than 80 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.client.age.numeric" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.phone')" for="client-phone">Phone</label>
                        <input type="text" class="form-control" name="phone" id="client-phone"
                            :class="{'valid': !$v.client.phone.$invalid, 'invalid': $v.client.phone.$invalid }" v-model="$v.client.phone.$model"  required/>
                        <div v-if="$v.client.phone.$anyDirty && $v.client.phone.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.phone.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.email')" for="client-email">Email</label>
                        <input type="text" class="form-control" name="email" id="client-email"
                            :class="{'valid': !$v.client.email.$invalid, 'invalid': $v.client.email.$invalid }" v-model="$v.client.email.$model"  required/>
                        <div v-if="$v.client.email.$anyDirty && $v.client.email.$invalid">
                            <small class="form-text text-danger" v-if="!$v.client.email.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('jHipsterApp.client.photo')" for="client-photo">Photo</label>
                        <div>
                            <img v-bind:src="'data:' + client.photoContentType + ';base64,' + client.photo" style="max-height: 100px;" v-if="client.photo" alt="client image"/>
                            <div v-if="client.photo" class="form-text text-danger clearfix">
                                <span class="pull-left">{{client.photoContentType}}, {{byteSize(client.photo)}}</span>
                                <button type="button" v-on:click="clearInputImage('photo', 'photoContentType', 'file_photo')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_photo" id="file_photo" v-on:change="setFileData($event, client, 'photo', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="photo" id="client-photo"
                            :class="{'valid': !$v.client.photo.$invalid, 'invalid': $v.client.photo.$invalid }" v-model="$v.client.photo.$model" />
                        <input type="hidden" class="form-control" name="photoContentType" id="client-photoContentType"
                            v-model="client.photoContentType" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.client.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./client-update.component.ts">
</script>
