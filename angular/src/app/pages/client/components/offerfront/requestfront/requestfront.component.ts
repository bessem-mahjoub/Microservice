import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from 'src/app/core/Offer';
import { Request } from 'src/app/core/Request';
import { TypeInternship } from 'src/app/core/TypeInternship';
import { User } from 'src/app/core/User';
import { OfferService } from 'src/app/services/offer.service';
import { RequestService } from 'src/app/services/request.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/services/Notification.service';

@Component({
  selector: 'app-requestfront',
  templateUrl: './requestfront.component.html',
  styleUrls: ['./requestfront.component.css']
})
export class RequestfrontComponent implements OnInit, OnDestroy {
  requestForm: FormGroup;
  offerId: number;
  request: Request = new Request();
  typeInternships: TypeInternship[] = [];
  reqId: number;
  private routeSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private offerService: OfferService,
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationservice : WebSocketService
  ) {
    this.requestForm = this.fb.group({
      typeInternship: ['', Validators.required],
      message: ['', Validators.required],
      supervisorId: [2], // Assuming supervisorId is a control in your form
      studentId: [1], // Assuming studentId is a control in your form
      offerId: [''] // Assuming offerId is a control in your form
    });
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.offerId = +params['offer_id'];
      this.typeInternships = Object.values(TypeInternship).filter(value => typeof value === 'number') as TypeInternship[];
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe(); // Unsubscribe from route params subscription to avoid memory leaks
  }

  submitRequest(): void {
    if (this.requestForm.valid) {
      console.log('Form is valid. Submitting request...');

      const formData = new FormData();
      formData.append('req', JSON.stringify({
        id: this.reqId,
        message: this.requestForm.value.message,
        submit: true,
        supervisor: 2,
        student: 1,
        offer: { id: this.requestForm.value.offerId } as Offer,
      }));

      console.log('Form data:', formData);

      this.requestService.createrequest(formData).subscribe(
        (response) => {
          console.log('Request added successfully:', response);
          this.router.navigate(['/ui-components/task']);
        },
        error => {
          console.error('Error creating request:', error);
          // Add additional console logs to inspect the error further
          console.log('Error status:', error.status);
          console.log('Error message:', error.message);
        }
      );
    } else {
      console.log('Form is invalid. Cannot submit request.');
    }
    const notifys= {
      description: `U have new offer submmited`,
      senderId: 1,
      receiverId:2
    };
        this.notificationservice.sendNotification(notifys)
  }

}


