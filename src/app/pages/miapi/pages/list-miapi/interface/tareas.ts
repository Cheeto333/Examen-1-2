export interface Tareas {
    tareas: Tarea[];
}

export interface Tarea {
    _id?:           string;
    titulo:        string;
    descripcion:   string;
    completada:    boolean;
    fechaCreacion: Date;
}

