import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { suitability } from './suitability-model';
import { SuitabilityService } from './suitability-service';
import { stringify } from 'querystring';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-suitability-inbox',
  templateUrl: './suitability-inbox.component.html',
  styleUrls: ['./suitability-inbox.component.scss']
})

export class SuitabilityInboxComponent implements OnInit {

  constructor(private http: HttpClient, private fb: FormBuilder,
    private suitabilityService: SuitabilityService) {

  }
  displayedColumns: string[];
  dataSource = new MatTableDataSource<suitability>();
  postData: any;
  formObj: any;
  public baseURL = "http://localhost:3000/";

  //spinner properties
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  loading :boolean = false;
// To highlight the row in a table
 selectedRowIndex: number = -1;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  caseSearchForm = this.fb.group({
    contactNo: new FormControl('', [Validators.required]),
    requestID: new FormControl('', [Validators.required]),
    ownerName: new FormControl('', [Validators.required]),
    ownerSSN: new FormControl('', [Validators.required]),
    annuitantName: new FormControl('', [Validators.required]),
    annuitantSSN: new FormControl('', [Validators.required]),
    producerName: new FormControl('', [Validators.required]),
    producerSSN: new FormControl('', [Validators.required]),
    producerFirm: new FormControl('', [Validators.required]),
    setupDate: new FormControl(''),
    statusSelect: new FormControl('', [Validators.required]),
    principalSelect: new FormControl(''),
    caseindicatorSelect: new FormControl(''),
    watchlistSelect: new FormControl('')

  })


  public ngOnInit() {
    this.suitabilityService.getProducts(this.baseURL + 'searchheader')
      .subscribe((data: any[]) => {
        this.displayedColumns = data;
      })
    this.suitabilityService.getProducts(this.baseURL + 'searchCriteria')
      .subscribe((data: any[]) => {
        this.dataSource.data = data;
      })
    this.dataSource.paginator = this.paginator;
    this.caseSearchForm.valueChanges.subscribe((filterValue) => {
      this.dataSource.filter = JSON.stringify(filterValue);
    });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      var searchTerm = JSON.parse(filter);
      return ((data.contactNo.toString().includes(searchTerm.contactNo) || searchTerm.contactNo == null) &&
        (data.requestID.toString().includes(searchTerm.requestID) || searchTerm.requestID == null) &&
        (data.ownerName.toLowerCase().includes(searchTerm.ownerName) || searchTerm.ownerName == null) &&
        (data.ownerSSN.toString().includes(searchTerm.ownerSSN) || searchTerm.ownerSSN == null) &&
        (data.annuitantSSN.toString().includes(searchTerm.annuitantSSN) || searchTerm.annuitantSSN == null) &&
        (data.producerName.toString().includes(searchTerm.producerName) || searchTerm.producerName == null) &&
        (data.producerSSN.toString().includes(searchTerm.producerSSN) || searchTerm.producerSSN == null) &&
        (data.setupDate.toString().includes(searchTerm.setupDate) || searchTerm.setupDate == null) &&
        (data.statusSelect.toString().includes(searchTerm.statusSelect) || searchTerm.statusSelect == null) &&
        (data.principalSelect.toString().includes(searchTerm.principalSelect) || searchTerm.principalSelect == null) &&
        (data.caseindicatorSelect.toString().includes(searchTerm.caseindicatorSelect) || searchTerm.caseindicatorSelect == null) &&
        (data.watchlistSelect.toString().includes(searchTerm.watchlistSelect) || searchTerm.watchlistSelect == null))
    };
  }


  public sumbitSearchFilter() {
    var requestObj = this.caseSearchForm.value;
    console.log(requestObj,"!!!!");
    this.suitabilityService.doSearch(this.baseURL + "postSearch", requestObj)
    .subscribe((searchData: any) => { 
      if(searchData){
        this.loading = true;
        setTimeout(() => {
          console.log('hide');
          this.loading = false;
        }, 5000);
        this.dataSource.filter = '';
        this.dataSource.data = searchData;
      }
    },(error) => console.log(error)
    )
  }
  clearFilter(){
    this.caseSearchForm.reset();
  }
  highlight(row){
    this.selectedRowIndex = row.contactNo;
}
}
