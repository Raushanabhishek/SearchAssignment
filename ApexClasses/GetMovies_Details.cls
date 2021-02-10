/*
 * Class Name : GetMovies_Details.
 * Purpose : Getting Movies Details by Movie Name.
*/
public class GetMovies_Details {

    @AuraEnabled
    public static String getMoviesDetailsByName(String movieName){
        
        if(movieName !=null && movieName !=''){
            try{
                String movie = movieName.replace('\"','').toLowercase();
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:OMDB_API/?s='+movie+'&apikey=7652e675');
                req.setMethod('GET');
                Http http = new Http();
                HTTPResponse res = http.send(req);
                System.debug(res.getBody());
                if(res.getStatusCode() == 200){
                    return res.getBody();    
                }                
            }catch(Exception ex){
                System.debug('Exception :: '+ ex.getMessage() + ' Line Number :: '+ ex.getLineNumber());
            }
        }
       return null; 
    }
    
}