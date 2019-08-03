import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {HttpClient} from '@angular/common/http';
import {suitability} from './suitability-model';
import { stringify } from 'querystring';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


 
@Component({
  selector: 'app-suitability-inbox',
  templateUrl: './suitability-inbox.component.html',
  styleUrls: ['./suitability-inbox.component.scss']
})

export class SuitabilityInboxComponent implements OnInit {

 
  constructor(private http :HttpClient,private fb:FormBuilder) {   

}
displayedColumns: string[];
  dataSource = new MatTableDataSource<suitability>();
  searchFilter :any;
  formObj : any;
  // caseSearchForm : FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  caseSearchForm = this.fb.group({
    contactNo: new FormControl(),
    requestID: new FormControl(),
    ownerName: new FormControl(),
    ownerSSN: new FormControl(),
    annuitantName: new FormControl(),
    annuitantSSN: new FormControl(),
    producerName: new FormControl(),
    producerSSN: new FormControl(),
    producerFirm: new FormControl(),
    setupDate:new FormControl(),
    statusSelect: new FormControl('', [Validators.required]),
    principalSelect : new FormControl(),
    caseindicatorSelect :new FormControl(),
    watchlistSelect : new FormControl()
  
  })


 public ngOnInit() {
  this.http.get('http://localhost:3000/searchheader')
  .subscribe((data: any[]) => {
    this.displayedColumns = data;
  })
    this.http.get('http://localhost:3000/searchCriteria')
    .subscribe((data : any[])=>{
      this.dataSource.data= data;
    })
    this.dataSource.paginator = this.paginator;
    this.caseSearchForm.valueChanges.subscribe((filterValue) => {
          this.dataSource.filter = JSON.stringify(filterValue);
        });

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      var searchTerm = JSON.parse(filter);
      return ((data.contactNo.toString().includes(searchTerm.contactNo) || searchTerm.contactNo==null)&& 
      (data.requestID.toString().includes(searchTerm.requestID)|| searchTerm.requestID==null) && 
      (data.ownerName.toLowerCase().includes(searchTerm.ownerName) || searchTerm.ownerName==null)&& 
      (data.ownerSSN.toString().includes(searchTerm.ownerSSN) || searchTerm.ownerSSN==null)&&
      (data.annuitantSSN.toString().includes(searchTerm.annuitantSSN) || searchTerm.annuitantSSN==null)&&
      (data.producerName.toString().includes(searchTerm.producerName) || searchTerm.producerName==null)&&
      (data.producerSSN.toString().includes(searchTerm.producerSSN) || searchTerm.producerSSN==null)&&
      (data.setupDate.toString().includes(searchTerm.setupDate)|| searchTerm.setupDate==null)&&
      (data.statusSelect.toString().includes(searchTerm.statusSelect)|| searchTerm.statusSelect==null)&&
      (data.principalSelect.toString().includes(searchTerm.principalSelect)|| searchTerm.principalSelect==null)&&
      (data.caseindicatorSelect.toString().includes(searchTerm.caseindicatorSelect)|| searchTerm.caseindicatorSelect==null)&&
      (data.watchlistSelect.toString().includes(searchTerm.watchlistSelect)|| searchTerm.watchlistSelect==null))};
}


  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    console.log(this.dataSource,"this.dataSource.filterthis.dataSource.filter")
  }

   public postSearch = ()=>{
    let postQuery = this.dataSource.filter;
    console.log(postQuery,"postQuerypostQuerypostQuery");
    this.http.get('http://localhost:3000/postSearchResponse')
      .subscribe(response => {  
        console.log(response,"RESPONSE !!!!!!!!!!");  
      });  
  }
  


  sumbitSearchFilter(actioncall: string) {

//    this.formObj = {
//       contactNo: this.contactNoFilter.value || '',
//       requestID: this.requestIdFilter.value || '',
//       ownerName: this.ownerNameFilter.value || '',
//       ownerSSN: this.ownerSSNFilter.value || '',
//       annuitantName: this.annuitantName.value || '',
//       annuitantSSN: this.annuitantSSN.value || '',
//       producerName: this.producerName.value || '',
//       producerSSN: this.producerSSN.value || '',
//       producerFirm: this.producerFirm.value || '',
//       setupDate: this.setupDate.value || '',
//       statusSelect: this.statusSelect.value || '',
//       principalSelect: this.principleSelect.value || '',
//       caseindicatorSelect: this.caseindicatorSelect.value || '',
//       watchlistSelect: this.watchlistSelect.value || ''
//     }

//     if (actioncall === "submitsearch") {
//       console.log(this.formObj);
//     } 
    
// }
}

 }
