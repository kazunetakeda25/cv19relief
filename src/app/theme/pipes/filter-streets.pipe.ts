import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStreets'
})
export class FilterStreetsPipe implements PipeTransform {
  transform(items:Array<any>, filter: any) {  
    let neighborhoodIds = [];    
    if(filter.neighborhoods){
      filter.neighborhoods.forEach(neighborhood => {
        neighborhoodIds.push(neighborhood.id);
      }); 
    }
    if(neighborhoodIds.length > 0){      
      return items.filter(item => {            
        return neighborhoodIds.indexOf(item.neighborhoodId) > -1;             
      });
    } 
    if(filter.cityId){
      return items.filter(item => item.cityId == filter.cityId);
    } 
    return items;  
  }
}