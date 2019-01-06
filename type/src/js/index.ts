
//import axios from 'axios';
import Axios,{} from '../../node_modules/axios/index'

//const axios = require('axios');
const url = "https://eksamen1912201820181219012533.azurewebsites.net/api/temperature";

const MessureTable: HTMLTableElement = <HTMLTableElement>document.getElementById("messureTable");
const OneMessureTable: HTMLTableElement = <HTMLTableElement>document.getElementById("oneMessureTable");

const getMessureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getMessureButton");
const postMessureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("postMessureButton");
const deleteMessureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("deleteMessureButton");
const putMessureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("putMessureButton");

const messureIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("messureIdInput");

const deleteIdInput: HTMLInputElement = <HTMLInputElement>document.getElementById("deleteIdInput");
const postPressureInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postPressureInput");
const postHumidityInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postHumidityInput");
const postTemperatureInput: HTMLInputElement = <HTMLInputElement>document.getElementById("postTemperatureInput");

getMessureButton.addEventListener("click", function () { GetMessureData() });

interface Messure {
    id: string;
    pressure: string;
    humidity: string;
    temperature: string;
    timestamp: string;
}

//Funktion til at hente alle bud
function PopulateAllMessureTable(): void {
    // OneMessureTable.innerText = " "
    if (MessureTable.rows.length > 1) {
        for (let i = 1; i < MessureTable.rows.length; i++) {
            MessureTable.deleteRow(i);
        }
    }
    Axios.get(url)
        .then(function (response) {
          let MessureInfo = response.data as Messure[];

            MessureInfo.forEach(messure => {
                let messureRow = document.createElement('tr');
                MessureTable.appendChild(messureRow);

                let elID = document.createElement('td');
                let elPressure = document.createElement('td');
                let elHumidity = document.createElement('td');
                let elTemperature = document.createElement('td');
                let elTime = document.createElement('td');

                elID.innerHTML = messure.id;
                elPressure.innerHTML = messure.pressure;
                elHumidity.innerHTML = messure.humidity;
                elTemperature.innerHTML = messure.temperature;
                elTime.innerHTML = messure.timestamp;

                messureRow.appendChild(elID);
                messureRow.appendChild(elPressure);
                messureRow.appendChild(elHumidity);
                messureRow.appendChild(elTemperature);
                messureRow.appendChild(elTime);
            });
        })
        .catch(function (error) {
            console.log(error);
        })
}

//Funktion til at hente data om et givent ID
function GetMessureData(): void {
  if (OneMessureTable.rows.length > 1) { OneMessureTable.deleteRow(1); }
  let id = Number(messureIdInput.value);
  if (id < 1) { return; }
  Axios.get(url +"/"+ messureIdInput.value)
      .then(function (response) {
        
          let messureRow = document.createElement('tr');
          OneMessureTable.appendChild(messureRow);
          
          let elID = document.createElement('td');
          let elPressure = document.createElement('td');
          let elHumidity = document.createElement('td');
          let elTemperature = document.createElement('td');
          let elTime = document.createElement('td');

          elID.innerHTML = response.data[0].id;
          elPressure.innerHTML = response.data[0].pressure;
          elHumidity.innerHTML = response.data[0].humidity;
          elTemperature.innerHTML = response.data[0].temperature;
          elTime.innerHTML = response.data[0].timestamp;

          messureRow.appendChild(elID);
          messureRow.appendChild(elPressure);
          messureRow.appendChild(elHumidity);
          messureRow.appendChild(elTemperature);
          messureRow.appendChild(elTime);
      })
      .catch(function (error) {
          console.log(error);
      })
}

//Funktion til at poste en ny måling
postMessureButton.onclick = () => { 
    let pre = postPressureInput.value;
    let hum = postHumidityInput.value;
    let temp = postTemperatureInput.value;

    if ( pre == "" || hum == "" || temp == "") { return; }
    Axios.post(url, {
        pressure: pre,
        humidity: hum,
        temperature: temp
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Funktion til at opdatere en måling
putMessureButton.onclick = () => {
    let pre = postPressureInput.value;
    let hum = postHumidityInput.value;
    let temp = postTemperatureInput.value;

    if ( pre == "" || hum == "" || temp == "") { return; }
    Axios.put(url+"/"+messureIdInput.value, {
        pressure: pre,
        humidity: hum,
        temperature: temp
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

//Funktion til at slette en måling
deleteMessureButton.onclick = () => {
    Axios.delete(url+"/"+deleteIdInput.value)
    .then(function (response) {
        console.log(response);
        PopulateAllMessureTable();
    })
    .catch(function (error) {
        console.log(error);
    });
    }

PopulateAllMessureTable();

