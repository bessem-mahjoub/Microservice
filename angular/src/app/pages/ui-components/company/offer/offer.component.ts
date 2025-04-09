import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from 'src/app/core/Offer';
import { AddOfferComponent } from '../add-offer/add-offer.component';
import { OfferService } from 'src/app/services/offer.service';
import { UpdateOfferComponent } from '../update-offer/update-offer.component';
import { TypeInternship } from 'src/app/core/TypeInternship';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  offers: Offer[];
  companyId: number;
  filteredOffers: Offer[]; // Nouvelle propriété pour les offres filtrées
  searchTerm: string = ''; // Nouvelle propriété pour le terme de recherche

  constructor(
    private offerService: OfferService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Fetching offers of company");
    const companyId = this.route.snapshot.params["id"];
    this.companyId = companyId;
    console.log(companyId);
    this.offerService.getOffersByCompany(companyId).subscribe(offers => {
      this.offers = offers;
      
      this.filteredOffers = offers; // Initialise filteredOffers avec toutes les offres
    });
  }
  filterOffers(): void {
    if (!this.searchTerm) {
        this.filteredOffers = this.offers; // Return all offers if search term is empty
        return;
    }

    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredOffers = this.offers.filter(offer => {
        const typeInternshipString = offer.typeInternship.toString(); // Correct way to get string representation
        const typeInternshipLower = typeInternshipString.toLowerCase();
        return typeInternshipLower.includes(searchTermLower);
    });

    console.log('Filtered Offers:', this.filteredOffers);
}

  
  fetchOffers(): void {
    this.offerService.getAllOffers().subscribe(
      offers => {
        this.offers = offers;
        this.filteredOffers = offers; // Met à jour filteredOffers avec toutes les offres récupérées
      },
      error => {
        console.error('Error fetching offers:', error);
      }
    );
  }
  show_add(): void {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      data: {
        companyId: this.companyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.fetchOffers();
    });
  }

  deleteOffer(id: number): void {
    if (confirm('Are you sure you want to delete this offer ?')) {
      this.offerService.deleteOffer(id).subscribe(
        () => {
          this.offers = this.offers.filter(Offer => Offer.id !== id);
        },
        (error: any) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  openUpdateDialog(id: number): void {
    const dialogRef = this.dialog.open(UpdateOfferComponent, {
      data: { id: id, ...this.offers.find(Offer => Offer.id === id) }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchOffers();
    });
  }
}
