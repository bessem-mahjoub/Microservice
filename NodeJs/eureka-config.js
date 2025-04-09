// Ajoutez en haut de votre fichier server.js
const Eureka = require('eureka-js-client').Eureka;

const eureka = new Eureka({
  instance: {
    app: 'user-service',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': process.env.PORT || 3000,
      '@enabled': true,
    },
    vipAddress: 'user-service',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
    maxRetries: 10,
    requestRetryDelay: 2000,
  }
});

// Modifiez votre code de démarrage du serveur
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  
  eureka.start(error => {
    if (error) {
      console.log('Erreur lors de l\'enregistrement avec Eureka:', error);
      return;
    }
    console.log('Service enregistré avec succès auprès d\'Eureka');
  });
});

// Gestion de l'arrêt
process.on('SIGINT', () => {
  eureka.stop(error => {
    console.log(error || 'Désinscrit d\'Eureka');
    server.close(() => {
      console.log('Serveur HTTP arrêté');
      process.exit();
    });
  });
});