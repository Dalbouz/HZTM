
import { Injectable } from "@angular/core";
import { utils, writeFile } from 'xlsx';

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

  public formatDateToYYYYMMDD(dateString: string): string {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
    // return `${day}.${month}.${year}`;
  }

  /**
 * Exports an HTML table to Excel
 * @param tableId ID of the table element (e.g., "my-table")
 * @param fileName Desired filename (e.g., "export.xlsx")
 * Export the entire table
 */
  public exportTableToExcel(tableId: string, fileName: string): void {
    // Get the table element
    const table = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
      console.error(`Table with ID '${tableId}' not found.`);
      return;
    }

    // Convert table to worksheet
    const worksheet = utils.table_to_sheet(table);

    // Create workbook and add worksheet
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write file
    writeFile(workbook, fileName);
  }

  //use this if the table is create with an if function and this exports a table created withing a table
  public exportAllTestTables(className: string, fileName: string = 'all_tests.xlsx') {
    const testTables = document.getElementsByClassName(className);
    const allRows: any[][] = [];
    let headers: any[] | null = null;

    Array.from(testTables).forEach((table) => {
      const sheetData = utils.sheet_to_json(
        utils.table_to_sheet(table as HTMLTableElement),
        { header: 1 }
      ) as any[][];

      if (!headers && sheetData.length > 0) {
        headers = sheetData[0];
        allRows.push(headers);
      }
      // Add all data rows except the header
      for (let i = 1; i < sheetData.length; i++) {
        allRows.push(sheetData[i]);
      }
    });

    if (!headers) {
      alert("No data found to export.");
      return;
    }

    const worksheet = utils.aoa_to_sheet(allRows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'All_Tests');
    writeFile(workbook, fileName);
  }
}
