import type { ApiContract } from '../apiContract'
import express, { type Express } from 'express'
import type { RouteContract } from './routes/routesContract';

export class ApiExpress implements ApiContract {

  private app: Express;

  private constructor(routes: RouteContract[]) {
    this.app = express();
    this.app.use(express.json());
    this.addRoutes(routes);
  }

  public static create(routes: RouteContract[]) {
    return new ApiExpress(routes);
  }

  private addRoutes(routes: RouteContract[]) {
    // biome-ignore lint/complexity/noForEach: <explanation>
    routes.forEach((route) => {
      const path = route.getPath();
      const method = route.getMethod();
      const handler = route.getHandler();

      this.app[method](path, handler);
    });

    this.listRoutes(); // ✅ Chamando aqui, após todas as rotas estarem registradas
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  }

  private listRoutes() {
    if (!this.app._router) {
      console.log('Nenhuma rota foi registrada ainda.');
      return;
    }
    const routes = this.app._router.stack
      // biome-ignore lint/suspicious/noExplicitAny: necessário para acessar propriedades internas
      .filter((route: any) => route.route)
      // biome-ignore lint/suspicious/noExplicitAny: necessário para acessar propriedades internas
      .map((route: any) => ({
        path: route.route.path,
        method: route.route.stack[0].method.toUpperCase(),
      }));

    console.log('Rotas registradas:', routes);
  }
}
