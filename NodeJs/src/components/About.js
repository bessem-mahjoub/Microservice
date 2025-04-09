import React from 'react';
import './About.css';

const About = () => {
    const offices = [
        {
            country: 'Tunis',
            details: {
                web: 'www.TenStep.com',
                name: 'TenStep, Inc.',
                ceos: ['Tom Mochal, CEO', 'Andrea Krasnoff, Vice President, TenStep Consulting Services'],
                address: '181 Waterman St.\nMarietta, GA 30060\nÉtats-Unis',
                phone: '+1 877 536 8434 / +1 770 795 9097',
                email: 'admin@tenstep.com'
            },
        },
        // Rest of offices...
        // I've taken the liberty of only writing out one additional office to show how you would format it.
        // Continue in the same format for all other offices.
        {
            country: 'Afrique du Sud',
            details: {
                web: 'www.TenStepza.com',
                name: 'TenStep Afrique du Sud',
                ceos: ['Michelle Booysen et MJ Fick, CEO'],
                address: '1st Floor, Willowbridge Centre Willie van Schoor, Drive Durbanville, Cape Town\n4 Dunton Rd Edinburgh, Rivonia, Johannesburg\nAfrique du Sud',
                phone: '+27 82 808 0161',
                email: 'MJ.Fick@TenStepZA.com'
            },
        },
        {
          "country": "Brésil",
          "details": {
              "web": "www.TenStep.com.br",
              "name": "TenStep Brésil",
              "ceos": ["John Grass, CEO"],
              "address": "Av Ararigboia, 330-507 Bairro Centro 95555-0 Capão da Canoa, RS Brésil",
              "phone": ": +55 51 36656242",
              "email": " JaGrass@TenStep.com.br"
          }
      },
      {
        "country": "Cameroun	",
        "details": {
            "web": "www.TenStepSIGA.com",
            "name": "TenStep Cameroun",
            "ceos": ["Auberlin Takugang Fogang, CEO"],
            "address": "Avenue Général de Gaule  Bonan  BP 1967 Douala Cameroun",
            "phone": "+237 77 721006",
            "email": "Auberlin.Takugang@tenstepSiga.com"
        }
    },
    {
      "country": "Bulgarie",
      "details": {
          "web": "www.TenStep.bg",
          "name": "TenStep Bulgarie",
          "ceos": ["Bulgarie"],
          "address": "Alexander Apostolov CE 45Vestets St office 13 1202 Sofia",
          "phone": "+35 92 9835324",
          "email": "info@TenStep.bg"
      },}
  
        // Other offices goes here...
    ];

    return (
    <div className='background'>
        <div className="About" >
            <h1>Le Groupe TenStep dans le monde</h1>
            <div className="officeGrid">
            {offices.map((office, index) => (
                <div key={index} className="officeCard">
                    <h2>{office.country}</h2>
                    <p><a href={`http://${office.details.web}`}>{office.details.web}</a></p>
                    <p>{office.details.name}</p>
                    {office.details.ceos.map((ceo, index) => (
                        <p key={index}>{ceo}</p>
                    ))}
                    <p>{office.details.address.split('\n').map((line, key) => <React.Fragment key={key}>{line}<br/></React.Fragment>)}</p>
                    <p>Téléphone: {office.details.phone}</p>
                    <p>Email: <a href={`mailto:${office.details.email}`}>{office.details.email}</a></p>
                </div>
            ))}
            </div>
      </div>
      </div>
    );
};

export default About;
