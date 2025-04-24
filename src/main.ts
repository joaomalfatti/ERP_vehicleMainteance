import { CreateVehicleUseCase } from "@domain/use-cases/vehicle/createVehicleUseCase";
import { ApiExpress } from "@infra/api/express/apiExpress";
import { CreateVehicleRoute } from "@infra/api/express/routes/vehicle/createVehicleExpressRoutes";
import { VehicleRepositoryPrisma } from "@infra/repositories/vehicle/vehicleRepositoryPrisma";
import { prisma } from "package/prisma/prisma";


function main () {
    const aRepository = VehicleRepositoryPrisma.create(prisma);
    const createVehicleUseCase = CreateVehicleUseCase.create(aRepository);
    
    const createRoute = CreateVehicleRoute.create(createVehicleUseCase);

    const port = 8000;

    const api = ApiExpress.create([createRoute])

    api.start(port)

}

main();