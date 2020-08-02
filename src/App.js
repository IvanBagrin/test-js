import React, { Component } from 'react';
import Loader from './components/Loader/Loader';
import Table from './components/Table/Table';
import _ from 'lodash';
import DetailRowView from './components/DetailRowView/DetailRowView'
import ModeSelector from './components/ModeSelector/ModeSelector'
import ReactPaginate from 'react-paginate'
import TableSearch from './components/TableSearch/TableSearch'
import Form from './components/Form/Form'

class App extends Component {
  state ={
    isModeSelected: false,
    isLoading: false,
    data: [],
    search: '',
    sort: 'asc',
    sortField: 'id',
    row: null,
    currentPage: 0,
    clickAddForm: false,
    addUser: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      items: [],
      disabledBtn: true,
    },
    
  }
  //получил данные с сервера
  async fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
   
    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    })

  }
  //сортировка
  onSort = sortField => {
    const cloneData = this.state.data.concat();
    const sort = this.state.sort === 'asc' ? 'desc' : 'asc';
    const data = _.orderBy(cloneData, sortField, sort);
    this.setState({ data, sort, sortField })
  }
//после выбора Большой или Маленький, передаем url для вызова базы пользователей
  modeSelectHandler = url => {

    this.setState({
      isModeSelected: true,
      isLoading: true,
    })
    this.fetchData(url)
  }

  //на какого пользователя был клик
  onRowSelect = row => {
    this.setState({row})
    
  }
  
  pageChangeHandler = ({selected}) => (
    this.setState({currentPage: selected})
  )

  searchHandler = search => {
    this.setState({search, currentPage: 0})
  }
//фильтрация
  getFilteredData(){
    const {data, search} = this.state

    if (!search) {
      return data
    }
   var result = data.filter(item => {
     return (
       item["firstName"].toLowerCase().includes(search.toLowerCase()) ||
       item["lastName"].toLowerCase().includes(search.toLowerCase()) ||
       item["email"].toLowerCase().includes(search.toLowerCase())
     );
   });
   if(!result.length){
     result = this.state.data
   }
    return result
  }
//Если был клик 'Добавить пользователя'
  clickAddFormHundler() {
    this.setState({
      clickAddForm: true
    })
  }
//После нажатия 'Добавить'
//Выключаем стандартное поведение браузера
  handleSubmit(event) {
    event.preventDefault();
    let items = [...this.state.data]
   let addUser = this.state.addUser
   //добавил пустой, чтоб можно было по новым пользователям кликать
   let address = {
    city: "",
    state: "",
    streetAddress: "",
    zip: "",
   }
   //вносим нового пользователя в массив
    items.unshift({
      id: this.state.addUser.id,
      firstName: this.state.addUser.firstName,
      lastName: this.state.addUser.lastName,
      email: this.state.addUser.email,
      phone: this.state.addUser.phone,
      description: '',
      address
    });
    //очищаю поля input
    addUser.id = '';
    addUser.firstName = '';
    addUser.lastName = '';
    addUser.email = '';
    addUser.phone = '';
    addUser.disabledBtn = true;
    //обновляю state с новым массивом и объект для инпутов
    this.setState({
      data:items,
      addUser,

    })
  }

  //проверка ввода в поля
  handleInputChange(e) {

    let input = e.target;
    let name = e.target.name;
    let value = input.value;
    let addUser = this.state.addUser;

    addUser[name] = value;
    this.setState({
      addUser
    })

//условие, для кнопки 'Добавить', если присутсвует пустое поле, то кнопка не активна
    if( addUser.id === '' 
        || addUser.firstName === '' 
        || addUser.lastName === ''
        || addUser.email === ''
        || addUser.phone === '') {
          addUser.disabledBtn = true;
        }else {
          addUser.disabledBtn = false;
} 

    
  }
  render() {
    const pageSize = 50;
    if(!this.state.isModeSelected){
      return (
        <div className="container">
          <ModeSelector onSelect={this.modeSelectHandler}/>
        </div>
      )
    }
   
    const filteredData = this.getFilteredData();
    // debugger
    const pageCount = Math.ceil(filteredData.length / pageSize)
    const displayData = _.chunk(filteredData, pageSize)[this.state.currentPage]
    return (
      <div className="container">
      {
        this.state.isLoading 
        ? <Loader />
        : <React.Fragment>
            <Form 
            clickAddForm = {this.state.clickAddForm}
            clickAddFormHundler = {this.clickAddFormHundler.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleInputChange = {this.handleInputChange.bind(this)}
            addUser = {this.state.addUser}
            disabledBtn = {this.state.addUser.disabledBtn}
            />
            <TableSearch onSearch={this.searchHandler}/>
            <Table 
              data={displayData}
              onSort={this.onSort}
              sort={this.state.sort}
              sortField={this.state.sortField}
              onRowSelect={this.onRowSelect}
            />
          </React.Fragment>

      }

      {
        this.state.data.length > pageSize
        ? <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.pageChangeHandler}
        containerClassName={'pagination'}
        activeClassName={'active'}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        forcePage={this.state.currentPage}
      /> : null
      }

      {
        this.state.row ? <DetailRowView person={this.state.row} /> : null
      }
      </div>
    );
  }
}

export default App;