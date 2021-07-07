<template>
     <div class="content">
    <div class="container">
      <h2 class="mb-5">LIST DES EMPLOYEE 
          <div 
          data-toggle="modal" 
          data-target="#exampleModal"
          class="btn btn-outline-success float-right">
          Add new
          <i class="fas fa-user-plus pl-2"></i></div></h2>
        
      <div class="table-responsive">

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
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
