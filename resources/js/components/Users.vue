<template>
      <div class="content">
        <div v-if="!$gate.is_admin_or_auther()">
          <not-found></not-found>
        </div>
    <div class="container" v-if="$gate.is_admin_or_auther()">
      <h2 class="mb-3">LIST DES EMPLOYEE 
          <div 
          @click="resetModal"
          
          class="float-right">
          
          <i class="fas fa-user-plus pr-3"></i></div></h2>
        
      <div class="table-responsive ">
<hr>
        <table class="table custom-table">
          <thead>
            <tr>
               
             
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Bio</th>
              <th scope="col">Role</th>
              <th scope="col">Craeted At</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users.data" :key="user.id" scope="row">

                      
                      <td>{{ user.name | upper }}</td>
                      <td>{{ user.email }}</td>
                      <td>
                        {{ user.bio | upper  }}
                        <small class="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>{{ user.order | upper }}</td>
                      <td>{{ user.created_at | myDate }}</td>
                      <td>
                          <a href="#">
                              <i @click="editeUser(user)" class="far fa-edit fa-lg px-1 "></i>
                          </a>/
                          <a href="#">
                              <i @click="deleteUser(user.id)" class="far fa-trash-alt fa-lg px-1 red" ></i>
                          </a>
                      </td>
            
            </tr>

          </tbody>
          <tfoot>
            <pagination class="text-center" :data="users" @pagination-change-page="getResults"></pagination>
            </tfoot>

        </table>
      </div>


    </div>
<div class="modal fade " id="addUser" tabindex="-1" role="dialog" aria-labelledby="addUser" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5  v-show="!editeMode" class="modal-title" id="addUser">Add New </h5>
        <h5  v-show="editeMode" class="modal-title" id="addUser">Update User Info </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      <form  @submit.prevent="editeMode ? updateUser() : createUser()">
          
          <div 
          v-if="form.errors.has('name') || 
                form.errors.has('email') ||
                form.errors.has('password') ||
                form.errors.has('bio') ||
                form.errors.has('order')" 
          class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Errors! </strong> There were some problems with your input.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>

        <div class="mb-4">
          <input id="name" v-model="form.name" type="text" name="name" placeholder="name" class="form-control" :class="[{'is-invalid' : form.errors.has('name')}]">
          <HasError :form="form" field="name" />
        </div>
        <div class="mb-4">
          <input id="email" v-model="form.email" type="email" name="email"  placeholder="email" class="form-control" :class="[{'is-invalid' : form.errors.has('email')}]" >
          <HasError :form="form" field="email" />
        </div>
        <div class="mb-4">
          <textarea id="bio" v-model="form.bio" type="text" name="bio"  placeholder="bio for the user" class="form-control" :class="[{'is-invalid' : form.errors.has('bio')}]"></textarea>
          <HasError :form="form" field="bio" />
        </div>
        <div class="mb-4">
          <select  name="order" v-model="form.order" class="form-control" :class="[{'is-invalid' : form.errors.has('order')}]" >
            <option value="">serelect user role</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
            <option value="auther">auther</option>
          <!-- <input id="order"  type="order" name="order"  placeholder="order" > -->
          </select>
          <HasError :form="form" field="order" />
        </div>
        
        <div class="mb-4">
          <input id="password" v-model="form.password" type="password" name="password" placeholder="password" class="form-control" :class="[{'is-invalid' : form.errors.has('password')}]">
          <HasError :form="form" field="password" />

        </div>
          
          
        
        <div class="modal-footer">
         

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <input type="submit" v-show="!editeMode" class="btn btn-success" value="Create">
          <input type="submit" v-show="editeMode" class="btn btn-primary" value="Update">
        </div>
      </form>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>

import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5'

    export default {
        components: {
    Button, HasError, AlertError
  },
      data(){
          return {
            editeMode :false,
            users:{},
            form: new Form({
              id:'',
              name:'',
              email:'',
              bio:'',
              order:'',
              password:'',
            })
          }
        },
        methods:{
          getResults(page = 1) {
            axios.get('api/user?page=' + page)
            .then(response => {
              this.users = response.data;
          })
          }
          ,
          updateUser(){
            this.$Progress.start();
            this.form.put('/api/user/' + this.form.id)
            .then(() => {
                Swal.fire(
                  'Updated!',
                  'Your user has been updated.',
                  'success'
                )
                $('#addUser').modal('hide')
                $('.modal-backdrop').replaceWith("");
                Fire.$emit('afterCreated');
               this.$Progress.finish();
            })
            .catch(() =>{
               Swal.fire({
                    icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  
                })
              this.$Progress.fail();
            })
          },
          editeUser(user){
            this.editeMode =true;
            this.form.fill(user)
            $('#addUser').modal('show')
          },
          resetModal(){
            this.editeMode =false;
            this.form.reset()
            $('#addUser').modal('show')
          },
          deleteUser(id){
              Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                this.$Progress.start();
                this.form.delete('api/user/'+ id)
                .then(() => {
                  Swal.fire(
                  'Deleted!',
                  'Your user has been deleted.',
                  'success'
                )
                Fire.$emit('afterCreated');
                this.$Progress.finish()
                })
                .catch(() => {
                  Swal.fire({
                    icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                  
                })
                this.$Progress.fail();
                })
              }
            })
          },
          loadUsers(){

            if(this.$gate.is_admin_or_auther()){
            axios.get('/api/user').then(
              ({data}) => {
                this.users = data;
            
              }
            )
            }
          },
          createUser(){
            this.$Progress.start();
            
            this.form.post('/api/user')
            .then(() => {
              Fire.$emit('afterCreated');
              $('#addUser').modal('hide')
              $('.modal-backdrop').replaceWith("");
              Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
              })
            this.$Progress.finish()
            })
            .catch(() => {
              this.$Progress.fail()
            })
            
            
          }
        },
        created() {
            Fire.$on('searching', () => {
              
              let query = this.$parent.search;
              axios.get("/api/findUser?q=" + query)
              .then((data) => {
                this.users = data.data;
              })
              .catch(() => {
                console.log('error');

              })
            });
            this.loadUsers();
            Fire.$on('afterCreated', () => this.loadUsers());
            // setInterval(() => this.loadUsers(), 3000);
          
            
        }
    }
</script>
