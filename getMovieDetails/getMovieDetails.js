import { LightningElement } from 'lwc';
import fetchMovieDetails from '@salesforce/apex/GetMovies_Details.getMoviesDetailsByName';
const columns = [

    { label:'Movie Title', fieldName:'Title', type:'text'},
    { label:'Year', fieldName:'Year', type:'text'},
    { label:'Movie Poster', fieldName:'Poster', type:'image'}
];
export default class GetMovieDetails extends LightningElement {
    
    data = [];
    item = [];
    columns = columns;
    isShowDataTable = false;
    movieName;
    page = 1;
    pageSize = 5;
    totalRecountCount = 0;
    totalPage = 0;
    startingRecord = 1;
    endingRecord = 0;
    
    handleClick(){

        this.movieName = this.template.querySelector('lightning-input').value;
        console.log(JSON.stringify(this.movieName));
        
        fetchMovieDetails({movieName : this.movieName}).then(response => {
            //console.log(JSON.stringify(response));
            if(response !== undefined && response !== null){

                //let paginationData = [];
                //paginationData = JSON.parse(response).Search;
                this.item = JSON.parse(response).Search;
                this.totalRecountCount = this.item.length;
                this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize);
                this.data = this.item.slice(0,this.pageSize); 
                this.endingRecord = this.pageSize; 
                this.isShowDataTable = true;
            }
        }).catch(error => {
            console.log('Error: ' +error);
        });

    }
        previousHandler() {
            if (this.page > 1) {
                this.page = this.page - 1; 
                this.displayRecordPerPage(this.page);
            }
        }
    
        
        nextHandler() {
            if((this.page<this.totalPage) && this.page !== this.totalPage){
                this.page = this.page + 1; 
                this.displayRecordPerPage(this.page);            
            }             
        }
    
        
        displayRecordPerPage(page){
    
            this.startingRecord = ((page -1) * this.pageSize) ;
            this.endingRecord = (this.pageSize * page);
    
            this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                                ? this.totalRecountCount : this.endingRecord; 
    
            this.data = this.item.slice(this.startingRecord, this.endingRecord);
    
            this.startingRecord = this.startingRecord + 1;
        }
    
}