import { CreateVehicleUseCase } from "@domain/use-cases/vehicle/createVehicleUseCase";
import { ListVehicleUseCase } from "@domain/use-cases/vehicle/listVehicleUseCase";
import { ApiExpress } from "@infra/api/express/apiExpress";
import { CreateVehicleRoute } from "@infra/api/express/routes/vehicle/createVehicleExpressRoutes";
import { ListVehicleRoute } from "@infra/api/express/routes/vehicle/listVehicleExpressRoutes";
import { VehicleRepositoryPrisma } from "@infra/repositories/vehicle/vehicleRepositoryPrisma";
import { prisma } from "package/prisma/prisma";


function main () {
    const aRepository = VehicleRepositoryPrisma.create(prisma);

    const createVehicleUseCase = CreateVehicleUseCase.create(aRepository);
    const listVehicleUseCase = ListVehicleUseCase.create(aRepository);
    
    const createRoute = CreateVehicleRoute.create(createVehicleUseCase);
    const listRoute = ListVehicleRoute.create(listVehicleUseCase)

    const port = 8000;

    const api = ApiExpress.create([createRoute, listRoute])

    api.start(port)

}

main();