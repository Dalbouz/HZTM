
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
    searchByFilters<T extends Record<string, any>>(array: T[], filters: Record<string, string>): T[] {
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

}
