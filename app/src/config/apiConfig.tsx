// Configuración centralizada de la API
export const API_CONFIG = {
    BASE_URL: "http://192.168.0.200:3000",

    PREFIX: "/api/dsm44",
    
    // Endpoints
    ENDPOINTS: {
        USUARIOS: "/usuarios",
        LOGIN: "/usuarios/login",
        TAREAS: "/tarea",
        IMAGENES: "/misimagenes",
        CLINICA: "/clinicamedica"
    },
    
    // URLs completas
    get USUARIOS_URL() {
        return `${this.BASE_URL}${this.PREFIX}${this.ENDPOINTS.USUARIOS}`;
    },
    
    get LOGIN_URL() {
        return `${this.BASE_URL}${this.PREFIX}${this.ENDPOINTS.LOGIN}`;
    },
    
    get TAREAS_URL() {
        return `${this.BASE_URL}${this.PREFIX}${this.ENDPOINTS.TAREAS}`;
    },

    get IMAGENES_URL() {
        return `${this.BASE_URL}${this.PREFIX}${this.ENDPOINTS.IMAGENES}`;
    },

    get CLINICA_URL() {
        return `${this.BASE_URL}${this.PREFIX}${this.ENDPOINTS.CLINICA}`;
    },
};