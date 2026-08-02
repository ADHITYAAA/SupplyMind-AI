import dashboardRepository from "./dashboard.repository.js";

class DashboardService {

    /*
    =====================================
    Overview Dashboard
    =====================================
    */

    async getOverviewDashboard() {

        return await dashboardRepository.getOverviewDashboard();

    }

    /*
    =====================================
    Inventory Dashboard
    =====================================
    */

    async getInventoryDashboard() {

        return await dashboardRepository.getInventoryDashboard();

    }

    /*
    =====================================
    Procurement Dashboard
    =====================================
    */

    async getProcurementDashboard() {

        return await dashboardRepository.getProcurementDashboard();

    }

    /*
    =====================================
    Warehouse Dashboard
    =====================================
    */

    async getWarehouseDashboard() {

        return await dashboardRepository.getWarehouseDashboard();

    }

    /*
    =====================================
    Supplier Dashboard
    =====================================
    */

    async getSupplierDashboard() {

        return await dashboardRepository.getSupplierDashboard();

    }

    /*
    =====================================
    Finance Dashboard
    =====================================
    */

    async getFinanceDashboard() {

        return await dashboardRepository.getFinanceDashboard();

    }

}

export default new DashboardService();