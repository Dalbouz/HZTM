
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class GenericServices{
    
        /**
     * Filters an array of objects based on multiple string filters.
     * @param array The array of objects to filter.
     * @param filters An object where keys are property names and values are filter strings.
     * @returns Filtered array of objects matching all non-empty filters (case-insensitive, substring match).
     */
    private searchByFilters<T extends Record<string, any>>(array: T[], filters: Record<string, string>): T[] {
    return array.filter(item =>
        Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true; // Ignore empty filters
        if (!item.hasOwnProperty(key)) return false;
        const value = item[key];
        return value !== undefined && value !== null &&
            value.toString().toLowerCase().includes(filterValue.toLowerCase());
        })
    );
    }

    public getFilteredArrayOnSearch(filters: any[], searchIn: any[]):any[]
  {
    const filtersObj: Record<string, string> = {};
    filters.forEach(f => {
      filtersObj[f.key] = f.active ? f.value : '';
    });
    return this.searchByFilters(searchIn, filtersObj);
  }

  public replaceObjectById<T extends { id?: string | number }>(
    array: T[],
    newObject: T
  ): T[] {
    const index = array.findIndex(item => item.id === newObject.id);
    if (index === -1){
      return array; // Not found  
    } 
    return [
      ...array.slice(0, index),
      newObject,
      ...array.slice(index + 1)
    ];
  }

    public disableAllFilters(filters: any[]): any[] {
      filters.forEach(f => {
      f.active = false;
      f.value = '';
    });
    return filters;
  }

  public toggleFilter(filter: any) {
    filter.active = !filter.active;
    if (!filter.active) filter.value = '';
  }
}
