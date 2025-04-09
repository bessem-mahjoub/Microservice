import { Binary } from "@angular/compiler";
import { Offer } from "./Offer";

export class Company {
    id: number;
    name: string;
    address: string;
    email: string;
    description: string;
    pnumber: Number;
    offers: Offer[];
};
function filterCompanies(companies: Company[], searchTerm: string): Company[] {
    if (!searchTerm) {
      return companies; // Return all companies if search term is empty
    }

    const searchTermLower = searchTerm.toLowerCase(); // Case-insensitive search

    return companies.filter(company => {
      return (
        company.name?.toLowerCase().includes(searchTermLower) ||
        company.address?.toLowerCase().includes(searchTermLower) ||
        company.email?.toLowerCase().includes(searchTermLower) ||
        company.description?.toLowerCase().includes(searchTermLower) ||
        company.pnumber?.toString().includes(searchTermLower)
      );
    });
  }
