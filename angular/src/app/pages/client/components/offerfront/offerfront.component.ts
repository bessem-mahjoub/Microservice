import { Company } from 'src/app/core/Company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OfferService } from 'src/app/services/offer.service';
import { Offer } from 'src/app/core/Offer';
import { WebSocketService } from 'src/app/services/Notification.service';
import { RequestService } from 'src/app/services/request.service';
import { Request } from 'src/app/core/Request';

@Component({
  selector: 'app-offer',
  templateUrl: './offerfront.component.html',
  styleUrls: ['./offerfront.component.scss']
})
export class OfferfrontComponent implements OnInit {
  offers: Offer[];
  companyId: number
  requests: Request[] = [];
  constructor(

    private offerService: OfferService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private notificationservice : WebSocketService,
    private requestService: RequestService
  ) { }

  ngOnInit(): void {
    console.log("fetching offers of company");
    const companyId = this.route.snapshot.params["id"];
    this.companyId=companyId;
    console.log(companyId);
    this.offerService.getOffersByCompany(companyId).subscribe(offers => {
      this.offers = offers;
    });
  }
  req(offer_id: number , typeInternship: string): void {
    this.router.navigate(["/components/requestfront", offer_id , { typeInternship: typeInternship }]);
  }
}
