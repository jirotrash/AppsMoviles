import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import { networkInterfaces } from 'os';

const getLocalIp = () => {
  // Forzar el uso de la IP de Wi-Fi para compatibilidad móvil
  const interfaces = networkInterfaces();
  
  // Buscar específicamente la interfaz Wi-Fi
  const wifiInterface = interfaces['Wi-Fi'];
  if (wifiInterface) {
    const ipv4 = wifiInterface.find(i => i?.family === 'IPv4' && !i.internal);
    if (ipv4) return ipv4.address;
  }
  
  // Fallback a cualquier interfaz no interna
  return Object.values(interfaces)
    .flat()
    .find(i => i?.family === 'IPv4' && !i.internal)?.address || 'localhost';
};

const capibara = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: [
          "http://localhost:8081",
          "http://10.172.189.74:8081",
          "http://192.168.56.1:8081",
          "http://192.168.0.195:8081",
          "http://10.224.234.19:8081",
          // Permitir cualquier IP en el rango local para desarrollo
          /^http:\/\/192\.168\.\d+\.\d+:8081$/,
          /^http:\/\/10\.\d+\.\d+\.\d+:8081$/
      ],
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
      credentials: true
  });
  app.use(json({limit: "100mb"}));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.setGlobalPrefix("api/dsm44");
  await app.listen(3000, '0.0.0.0');
  console.log(`Server running on: http://${getLocalIp()}:3000`);
  console.log(`Local access: http://localhost:3000`);
  console.log(`Network access: http://${getLocalIp()}:3000`);
}

capibara();
