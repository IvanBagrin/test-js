import React from 'react'
import './Form.css'

function Button(props) {

    return (!props.clickAddForm ?
        <button type="submit" class="btn btn-primary mb-3 mt-3" onClick = {props.clickAddFormHundler}>Добавить пользователя</button>
        :
        
        <form onSubmit = {props.handleSubmit}>
        
            <div className="input-group mb-3 mt-3">
                <div class="form-group">
                <label htmlFor="exampleInputEmail1">ID</label>
                <input value = {props.addUser.id} onChange = {props.handleInputChange} name = 'id'  type="text" id="exampleInputEmail1" className="form-control form-valid" placeholder="ID" />
           
                </div>

                <div class="form-group">
                <label htmlFor="exampleInputEmail1">First Name</label>
                <input value = {props.addUser.firstName} onChange = {props.handleInputChange} name = 'firstName' type="text" id="exampleInputEmail1" className="form-control form-valid" placeholder="Фамилия" />
                </div>

                <div class="form-group">
                <label htmlFor="exampleInputEmail1">Last Name</label>
                <input value = {props.addUser.lastName} onChange = {props.handleInputChange} type="text" name = 'lastName' id="exampleInputEmail1" className="form-control form-valid" placeholder="Имя" />
                </div>

                <div class="form-group">
                <label htmlFor="exampleInputEmail1">E-mail</label>
                <input value = {props.addUser.email} onChange = {props.handleInputChange} type="text" id="exampleInputEmail1" name = 'email' className="form-control form-valid" placeholder="Почта" />
                </div>

                <div class="form-group">
                <label htmlFor="exampleInputEmail1">Phone</label>
                <input value = {props.addUser.phone} onChange = {props.handleInputChange}  type="text" name = 'phone' id="exampleInputEmail1" className="form-control form-valid" placeholder="Номер" />
                </div>
            </div>
            <button  type="submit" className="btn btn-primary btn-hidden" id ='btn' disabled={props.disabledBtn} >Добавить</button>
        </form>
        

        
    )
    
    
}
export default Button;