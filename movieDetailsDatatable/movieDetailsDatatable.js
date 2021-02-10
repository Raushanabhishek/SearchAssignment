import LightningDatatable from 'lightning/datatable';
import moviePosterImage from './moviePosterImageDatatable.html';

export default class MovieDetailsDatatable extends LightningDatatable {
    static customTypes = {
        image: {
            template: moviePosterImage
        }
    };
}