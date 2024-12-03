// HTML CONTROLLER 
const HTMLCONTROLLER = (function() {
  const htmlelements = {
    button : document.getElementById('task-btn'),
    taskNumber : document.getElementById('task-number'),
    recordBtn : document.getElementById('record-btn'),
    tbody : document.querySelector('tbody')
  }
  let count = parseInt(htmlelements.taskNumber.textContent);
  return {
    htmlelements,
    count
  }
})()
//LS HANDLER 
let lsController = (function() {
  function addToLS(records) {
    localStorage.setItem('task-record',records)
  }
  function getRecords() {
    let records = JSON.parse(localStorage.getItem('task-record'));
    return records;
  }
  function addCountToLs(count){
    localStorage.setItem('count',JSON.stringify(count))
  }
  function getCount() {
    count = JSON.parse(localStorage.getItem('count'))
    return count;
  }
  return {
    addToLS,
    getRecords,
    addCountToLs,
    getCount
  }
})()
// RECORD HANDLER 
const recordHandler = (function(){
  const Record = function (id,task) {
    let date = new Date;
    this.id = id;
    this.task = task;
    this.date = `${date.getDate()} - ${parseInt(date.getMonth()) + 1} - ${date.getFullYear()}`;
  }
  let collection = [];
  return {
    collection, 
    Record
  }
})()
// EVENT LISTENERS FUNCTIONS
const EVENTLISTENERS = (function(){
  function increment(e){
  let 
  taskNumber = HTMLCONTROLLER.htmlelements.taskNumber;
  HTMLCONTROLLER.count += 1;
  taskNumber.textContent = `${HTMLCONTROLLER.count}`;
  lsController.addCountToLs(HTMLCONTROLLER.count)
  e.preventDefault();
  }
  function addRecord() {
    let 
    id,tr,
    collection = recordHandler.collection,
    taskNumber = HTMLCONTROLLER.htmlelements.taskNumber.textContent,
    tbody = HTMLCONTROLLER.htmlelements.tbody;
    console.log(taskNumber);
    if(lsController.getRecords() === null){
      collection = [];
    }else {
      collection = lsController.getRecords();
    }
    if(taskNumber !== '0'){
      if(collection.length !== 0){
        id = parseInt(collection.length);
      }else{
        id = 0;
      } 
      let record = new recordHandler.Record(id,taskNumber);
      collection.push(record);
      tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${record.id}</td>
        <td>${record.task}</td>
        <td>${record.date}</td>
      `;
      HTMLCONTROLLER.htmlelements.taskNumber.textContent = parseInt(0);
      HTMLCONTROLLER.count = parseInt(0);
      lsController.addCountToLs(parseInt(0))
      tbody.append(tr);  
      lsController.addToLS(JSON.stringify(collection))
    }
  }
  function addRecordToUi() {
    let 
    tbody = HTMLCONTROLLER.htmlelements.tbody,
    taskNumber = HTMLCONTROLLER.htmlelements.taskNumber,
    records = lsController.getRecords();
    if(lsController.getCount() === null){
      HTMLCONTROLLER.count = 0;
    } else{
      HTMLCONTROLLER.count = parseInt(lsController.getCount());
      taskNumber.textContent = parseInt(lsController.getCount());
    }
    try {
      records.forEach((record)=>{
        let tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${record.id}</td>
          <td>${record.task}</td>
          <td>${record.date}</td>
        `;
        tbody.append(tr);
      })
    } catch (error) {
      console.log('Welcome to task count')
    }
  }
  return {
    increment,
    addRecord,
    addRecordToUi
  }
})();
// APP CONTROLLER
const APPCONTROLLER = (function(){
  function init() {
    let 
    button = HTMLCONTROLLER.htmlelements.button,
    recordBtn = HTMLCONTROLLER.htmlelements.recordBtn;
    button.addEventListener('click',EVENTLISTENERS.increment);
    recordBtn.addEventListener('click',EVENTLISTENERS.addRecord);
    document.addEventListener('DOMContentLoaded',EVENTLISTENERS.addRecordToUi);

  }
  return {
    init
  }
})()
APPCONTROLLER.init();

