
//import axios from 'axios';
import Axios,{} from '../../node_modules/axios/index'

//const axios = require('axios');
const url = "https://test20190109111806.azurewebsites.net/api/car";
//const local_url ="http://localhost:3000/";

const CarTable: HTMLTableElement = <HTMLTableElement>document.getElementById("carTable");
const OneCarTable: HTMLTableElement = <HTMLTableElement>document.getElementById("oneCarTable");

const getCarButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getCarButton");
const postCarButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("postCarButton");
const deleteCarButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteCarButton");
const putCarButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("putCarButton");

const carIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("carIdInput");

const deleteIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteIdInput");
const postModelInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postModelInput");
const postTypeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postTypeInput");
const postYearInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postYearInput");
const postPriceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postPriceInput");

const putModelInput: HTMLInputElement = <HTMLInputElement>document.getElementById("putModelInput");
const putTypeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("putTypeInput");
const putYearInput: HTMLInputElement = <HTMLInputElement>document.getElementById("putYearInput");
const putPriceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("putPriceInput");

getCarButton.addEventListener("click", function () { GetCarData() });

interface Car {
    carId: string;
    carModel: string;
    carType: string;
    carYear: string;
    carPrice: string;
}

//Funktion til at hente alle biler
function AllCarTable(): void {
    // OneCarTable.innerText = " "
    if (CarTable.rows.length > 1) {
        for (let i = 1; i < CarTable.rows.length; i++) {
            CarTable.deleteRow(i);
        }
    }
    Axios.get(url)
        .then(function (response) {

          let CarInfo = response.data as Car[];

          CarInfo.forEach(car => {
                let carRow = document.createElement('tr');
                CarTable.appendChild(carRow);

                let elId = document.createElement('td');
                let elModel = document.createElement('td');
                let elType = document.createElement('td');
                let elYear = document.createElement('td');
                let elPrice = document.createElement('td');

                elId.innerHTML = car.carId;
                elModel.innerHTML = car.carModel;
                elType.innerHTML = car.carType;
                elYear.innerHTML = car.carYear;
                elPrice.innerHTML = car.carPrice;

                carRow.appendChild(elId);
                carRow.appendChild(elModel);
                carRow.appendChild(elType);
                carRow.appendChild(elYear);
                carRow.appendChild(elPrice);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Funktion til at hente data om et givent ID
function GetCarData(): void {
  if (OneCarTable.rows.length > 1) { OneCarTable.deleteRow(1); }
  let id = Number(carIdInput.value);
  if (id < 1) { return; }
  Axios.get(url +"/"+ carIdInput.value)
      .then(function (response) {

          let carRow = document.createElement('tr');
          OneCarTable.appendChild(carRow);
          
          let elId = document.createElement('td');
          let elModel = document.createElement('td');
          let elType = document.createElement('td');
          let elYear = document.createElement('td');
          let elPrice = document.createElement('td');

          elId.innerHTML = response.data[0].carId;
          elModel.innerHTML = response.data[0].carModel;
          elType.innerHTML = response.data[0].carType;
          elYear.innerHTML = response.data[0].carYear;
          elPrice.innerHTML = response.data[0].carPrice;

          carRow.appendChild(elId);
          carRow.appendChild(elModel);
          carRow.appendChild(elType);
          carRow.appendChild(elYear);
          carRow.appendChild(elPrice);
      })
      .catch(function (error) {
          console.log(error);
      })
}

//Funktion til at poste en ny bil
postCarButton.onclick = () => { 
    let carModel = postModelInput.value;
    let carType = postTypeInput.value;
    let carYear = postYearInput.value;
    let carPrice = postPriceInput.value;

    if (carModel == "" || carType == "" || carYear == "" || carPrice == "") { return; }
    Axios.post(url, {
        carModel: carModel,
        carType: carType,
        carYear: carYear,
        carPrice: carPrice
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Funktion til at opdatere en bil
putCarButton.onclick = () => {             
    let carModel = putModelInput.value;
    let carType = putTypeInput.value;
    let carYear = putYearInput.value;
    let carPrice = putPriceInput.value;

    if (carModel == "" || carType == "" || carYear == "" || carPrice == "") { return; }
    Axios.put(url+"/"+carIdInput.value, {
        carModel: carModel,
        carType: carType,
        carYear: carYear,
        carPrice: carPrice
    })
        .then(function (response) {
            //console.log(response.data)
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Funktion til at slette en bil
deleteCarButton.onclick = () => {
    Axios.delete(url+"/"+deleteIdInput.value)
    .then(function (response) {
        console.log(response);
        AllCarTable();
    })
    .catch(function (error) {
        console.log(error);
    });
    }

    AllCarTable();

