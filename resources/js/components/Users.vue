<template>
     <div class="content">
    <div class="container">
      <h2 class="mb-3">LIST DES EMPLOYEE 
          <div 
          data-toggle="modal" 
          data-target="#exampleModal"
          class=" float-right">
          
          <i class="fas fa-user-plus pr-3"></i></div></h2>
        
      <div class="table-responsive ">
<hr>
        <table class="table custom-table">
          <thead>
            <tr>
               
              <th scope="col">Order</th>
              <th scope="col">Name</th>
              <th scope="col">email</th>
              <th scope="col">contact</th>
              <th scope="col">option</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row">

              
                      
                      <td>
                        1392
                      </td>
                      <td>James Yates</td>
                      <td>
                        Web Designer
                        <small class="d-block">Far far away, behind the word mountains</small>
                      </td>
                      <td>+63 983 0962 971</td>
                      <td>
                          <a href="">
                              <i class="far fa-edit fa-lg px-1 "></i>
                          </a>/
                          <a href="">
                              <i class="far fa-trash-alt fa-lg px-1 red"></i>
                          </a>
                      </td>
            
            </tr>

           
            
          </tbody>
        </table>
      </div>


    </div>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      <form  @submit.prevent="createUser">
          
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
          <Button :form="form">Submit</Button>

          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <input type="submit" class="btn btn-success" value="Create">
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
            form: new Form({
              name:'',
              email:'',
              bio:'',
              order:'',
              password:'',
            })
          }
        },
        methods:{
          createUser(){
            this.form.post('/api/user');
          }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
