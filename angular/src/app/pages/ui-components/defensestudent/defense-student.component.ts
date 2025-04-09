import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { defense } from 'src/app/core/Defense';
import { DefenceService } from 'src/app/services/defence.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-defense-student',
  templateUrl: './defense-student.component.html',
  styleUrls: ['./defense-student.component.scss']
})
export class DefenseStudentComponent implements OnInit,AfterViewInit {
  @Output() calculateRouteEvent: EventEmitter<string> = new EventEmitter<string>();

  blocList: defense[] = [];
  selectedDefenceBloc: string ='' ;
  map: L.Map ;
  defences: defense[];
//calendarEvents: any[] = [];
private centroidH: L.LatLngExpression = [36.8981970128221, 10.189970708975915];
private centroidE: L.LatLngExpression = [36.89966874789553, 10.18982196413415];
private centroidM: L.LatLngExpression = [36.90225021696681, 10.189360434924096];
private centroidI: L.LatLngExpression = [ 36.90108025227159, 10.19027638089706];
private centroidJ: L.LatLngExpression = [ 36.90108025227159, 10.19027638089706];
private centroidK: L.LatLngExpression = [ 36.90108025227159, 10.19027638089706];
private centroidA: L.LatLngExpression = [ 36.89913305034116, 10.189278376812915];
private centroidB: L.LatLngExpression = [ 36.89913305034116, 10.189278376812915];
private centroidC: L.LatLngExpression = [ 36.89913305034116, 10.189278376812915];
private centroidD: L.LatLngExpression = [ 36.89913305034116, 10.189278376812915];
private userLocation: L.LatLngExpression;

//const bloc: string = this.selectedUserBloc ? this.selectedUserBloc.numeroDeBloc : '';
selectedUserBloc: defense | null | undefined = null;
  constructor(private http: HttpClient, private defenceService: DefenceService, private dialog: MatDialog,private cdr: ChangeDetectorRef) {


  }
  ngOnInit() {
    console.log('On init....');
    //this.defenceService.getAllDefence().subscribe((data: defense[]) => {
      //this.defences = data;
    this.fetchEvaluation() ;
    this.loadBloc();

   // this.getHistoriqueDefenseId(evaluation) ;
  // this.loadHistoriqueDefenses()   ;
 //  this.historiqueDefenseArray = [];

 }
 ngAfterViewInit(): void {
  console.log('ngAfterViewInit called');
  this.initMap(); // Initialisez la carte dans ngAfterViewInit si elle dépend des éléments de la vue

  navigator.geolocation.getCurrentPosition((position) => {
    this.userLocation = [position.coords.latitude, position.coords.longitude];
    this.calculateRoute(); // Appelez calculateRoute() après avoir obtenu la position de l'utilisateur
  });

 /* setTimeout(() => {
    this.initCharts();
  }, 0);*/
}


  fetchEvaluation(): void {
    this.defenceService.getAllDefenses().subscribe({
        next: (evaluations: defense[]) => {
            this.defences = evaluations;
            this.defences.forEach(defense => {
                // Mettre à jour numeroStockee pour chaque évaluation si nécessaire
               // evaluation.numeroStockee = evaluation.defense?.idDef ?? -1;
            });
        },
        error: (error: any) => {
            console.error('Error fetching Evaluation', error);
        }
    });
  }
  calculateRoute(): void {
    if (!this.selectedUserBloc || !this.userLocation) {
      console.error("Bloc or user location is not defined.");
      return;
    }

    const start = this.userLocation; // Utilisez directement la position actuelle
    const end = this.getDestinationLatLng(this.selectedUserBloc.numeroDeBloc);

    if (!end) {
      console.error("Destination coordinates not found for the selected bloc.");
      return;
    }

    const startLatLng = this.convertLatLng(start);
    const endLatLng = this.convertLatLng(end);

    L.Routing.control({
      waypoints: [
        L.latLng(startLatLng),
        L.latLng(endLatLng)
      ],
      routeWhileDragging: true
    }).addTo(this.map);

    const distance = startLatLng.distanceTo(endLatLng);
    console.log('Distance:', distance);
  }
  getDestinationLatLng(numeroDeBloc: string): L.LatLngExpression | null {
    let destination: L.LatLngExpression | null = null;

    switch (numeroDeBloc) {
      case 'H':
        destination = this.centroidH;
        break;
      case 'E':
        destination = this.centroidE;
        break;
      case 'M':
        destination = this.centroidM;
        break;
        case 'I':
          destination = this.centroidI;
          break;
          case 'J':
            destination = this.centroidJ;
            break;
            case 'K':
              destination = this.centroidK;
              break;
              case 'A':
                destination = this.centroidA;
                break;
                case 'B':
                  destination = this.centroidB;
                  break;
                  case 'C':
                    destination = this.centroidC;
                    break;
                    case 'D':
                      destination = this.centroidD;
                      break;
      default:
        console.error("Destination coordinates not found for the selected bloc.");
        break;
    }

    return destination;
  }
  openCreateDialogMapslocation(numeroDeBloc: string): void {
    if (!this.blocList || this.blocList.length === 0) {
      console.error('Bloc list not initialized or empty');
      return;
    }

    const selectedBloc: defense | undefined = this.blocList.find(defence => defence.numeroDeBloc === numeroDeBloc);
    this.selectedUserBloc = this.blocList.find(def => def.numeroDeBloc === numeroDeBloc);

    if (!selectedBloc) {
      console.error('Selected Bloc not found');
      return;
    }

    console.log('selectedBloc:', selectedBloc);
    let location: L.LatLngExpression;
    switch (numeroDeBloc) {
      case 'H':
        location = this.centroidH;
        break;
      case 'E':
        location = this.centroidE;
        break;
      case 'M':
        location = this.centroidM;
        break;
        case 'I':
        location = this.centroidI;
        break;
        case 'J':
        location = this.centroidJ;
        break;
        case 'K':
        location = this.centroidK;
        break;
        case 'A':
          location = this.centroidA;
          break;
          case 'B':
            location = this.centroidB;
            break;
            case 'C':
              location = this.centroidC;
              break;
              case 'D':
                location = this.centroidD;
                break;


      default:
        console.error('Unknown bloc:', numeroDeBloc);
        return;
    }

   /* const dialogRef = this.dialog.open(MapsComponent, {
      width: '700px',
      height: '700px',
      data: { location }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The maps was closed');
      this.fetchDefence(); // Refresh data after closing the map
      this.calculateRoute(); // Calculate the route when the map is closed
    });*/
    navigator.geolocation.getCurrentPosition((position) => {
      this.userLocation = [position.coords.latitude, position.coords.longitude];
      this.calculateRoute();
    });

  }
  private convertLatLng(location: L.LatLngExpression): L.LatLng {
    if (Array.isArray(location)) {
      return L.latLng(location[0], location[1]);
    } else {
      console.error("Invalid location coordinates:", location);
      return L.latLng(0, 0); // or any other default value
    }
  }
private initMap(): void {
  this.map = L.map('map', {
    center: this.centroidH, // Changez cette ligne pour utiliser le bloc que vous souhaitez afficher initialement
    zoom: 15
  });

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);

  L.Routing.control({
    waypoints: [
      L.latLng(this.centroidH),
      L.latLng(this.centroidE),
      L.latLng(this.centroidM),
      L.latLng(this.centroidI),
      L.latLng(this.centroidJ),
      L.latLng(this.centroidK),
      L.latLng(this.centroidA),
      L.latLng(this.centroidB),
      L.latLng(this.centroidC),
      L.latLng(this.centroidD),
      L.latLng(this.userLocation)
    ]
  }).addTo(this.map);
console.log("location user",L.latLng(this.userLocation)) ;
  // Ajouter le marqueur pour le bloc H
  L.marker(this.centroidH).addTo(this.map)
    .bindPopup('Bloc H - Esprit')
    .openPopup();

  // Ajouter le marqueur pour le bloc E
  L.marker(this.centroidE).addTo(this.map)
    .bindPopup('Bloc E - Esprit')
    .openPopup();

  // Ajouter le marqueur pour le bloc M
  L.marker(this.centroidM).addTo(this.map)
    .bindPopup('Bloc M - Esprit')
    .openPopup();
     // Ajouter le marqueur pour le bloc I
  L.marker(this.centroidI).addTo(this.map)
  .bindPopup('Bloc I,J,K - Esprit')
  .openPopup();
   // Ajouter le marqueur pour le bloc J
   L.marker(this.centroidJ).addTo(this.map)
   .bindPopup('Bloc I,J,K - Esprit')
   .openPopup();
    // Ajouter le marqueur pour le bloc K
  L.marker(this.centroidK).addTo(this.map)
  .bindPopup('Bloc I,J,K - Esprit')
  .openPopup();
      // Ajouter le marqueur pour le bloc A
      L.marker(this.centroidA).addTo(this.map)
      .bindPopup('Bloc A,B,C,D- Esprit')
      .openPopup();
          // Ajouter le marqueur pour le bloc B
  L.marker(this.centroidB).addTo(this.map)
  .bindPopup('Bloc A,B,C,D- Esprit')
  .openPopup();
      // Ajouter le marqueur pour le bloc C
      L.marker(this.centroidC).addTo(this.map)
      .bindPopup('Bloc A,B,C,D- Esprit')
      .openPopup();
          // Ajouter le marqueur pour le bloc D
  L.marker(this.centroidD).addTo(this.map)
  .bindPopup('Bloc A,B,C,D- Esprit')
  .openPopup();



  // Ajouter le marqueur de votre position actuelle
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const userLocation: L.LatLngExpression = [latitude, longitude];

    L.marker(userLocation).addTo(this.map)
      .bindPopup('Votre position actuelle')
      .openPopup();

    this.map.setView(userLocation, 15);
  });
  this.calculateRouteEvent.subscribe((numeroDeBloc: string) => {
    const destination: L.LatLngExpression | null = this.getDestinationLatLng(numeroDeBloc);
    if (destination) {
      let destinationLatLng: L.LatLng;
      if (Array.isArray(destination)) {
        destinationLatLng = L.latLng(destination[0], destination[1]);
      } else {
        destinationLatLng = destination as L.LatLng;
      }
      L.Routing.control({
        waypoints: [
          L.latLng(this.userLocation),
          destinationLatLng
        ]
      }).addTo(this.map);
    } else {
      console.error("Destination coordinates not found for the bloc:", numeroDeBloc);
    }
  });

}

  loadBloc(): void {
    this.defenceService.getAllDefenses().subscribe(
      (defenses: defense[]) => {
        this.blocList = defenses; // Utiliser userList au lieu de usedDefenseIds
      },
      (error) => {
        console.error('Erreur lors de la récupération des bloc:', error);
      }
    );
  }
}
