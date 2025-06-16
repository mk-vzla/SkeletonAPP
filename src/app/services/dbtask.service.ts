import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {

  public bd!: SQLiteObject;
  // Observable para rastrear si la base de datos está lista
  public bdLista: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.inicializarBaseDatos();
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  private inicializarBaseDatos() {
    this.sqlite.create({
      name: 'tarea.db',
      location: 'default'
    }).then((bd: SQLiteObject) => {
      this.bd = bd;
      this.crearTablas();
      this.bdLista.next(true);
      //this.mostrarToast('Base de datos inicializada correctamente');
    }).catch(error => {
      console.error('Error al inicializar la base de datos', error);
    })
  }

  private crearTablas() {
    // Tabla sesion_data
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS sesion_data (
        user_name TEXT(8) PRIMARY KEY,
        password INTEGER(4),
        active INTEGER(1) DEFAULT 0 NOT NULL
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla sesion_data creada correctamente'))
      // .catch(error => this.mostrarToast('Error al crear la tabla sesion_data'))
      ;

    // Tabla mis_datos
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS mis_datos (
        nombre TEXT(15),
        apellido TEXT(15),
        nivel_educacion TEXT(10),
        fecha_nacimiento DATE,
        user_name TEXT PRIMARY KEY,
        FOREIGN KEY(user_name) REFERENCES sesion_data(user_name)
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla mis_datos creada correctamente'))
      // .catch(error => this.mostrarToast('Error al crear la tabla mis_datos'))
      ;

    // Tabla experiencia_laboral
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS experiencia_laboral (
        empresa TEXT NOT NULL DEFAULT 'none',
        anio_inicio INTEGER(4),
        anio_termino INTEGER(4) DEFAULT (strftime('%Y','now')),
        cargo TEXT(20),
        user_name TEXT,
        PRIMARY KEY(user_name, empresa, anio_inicio),
        FOREIGN KEY(user_name) REFERENCES sesion_data(user_name)
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla experiencia_laboral creada correctamente'))
      // .catch(error => this.mostrarToast('Error al crear la tabla experiencia_laboral'))
      ;

    // Tabla certificaciones
    this.bd.executeSql(
      `CREATE TABLE IF NOT EXISTS certificaciones (
        nombre_certificado TEXT NOT NULL UNIQUE,
        fecha_obtencion DATE NOT NULL,
        fecha_vencimiento DATE DEFAULT (strftime('%Y','now')),
        user_name TEXT,
        PRIMARY KEY(user_name, nombre_certificado, fecha_obtencion),
        FOREIGN KEY(user_name) REFERENCES sesion_data(user_name)
      )`, []
    )
      // .then(() => this.mostrarToast('Tabla certificaciones creada correctamente'))
      // .catch(error => this.mostrarToast('Error al crear la tabla certificaciones'))
      ;
  }

  // Insertar datos de sesión:
  async insertarUsuario(username: string, password: string, active: number) {
    return this.bd.executeSql(
      `INSERT INTO sesion_data (user_name, password, active) VALUES (?, ?, ?)`,
      [username, password, active]
    ).then(() => {
      this.mostrarToast('Usuario insertado correctamente');
    }).catch(error => {
      this.mostrarToast('Error insertando usuario: ' + error.message);
    });
  }

  // Actualizar estado de sesión:
  async actualizarEstadoSesion(username: string, active: number) {
    return this.bd.executeSql(
      `UPDATE sesion_data SET active = ? WHERE user_name = ?`,
      [active, username]
    ).then(() => {
      this.mostrarToast('Estado de sesión actualizado correctamente');
    }).catch(error => {
      this.mostrarToast('Error actualizando estado de sesión: ' + error.message);
    });
  }

  // Validar usuario:
  async validarUsuario(username: string, password: string) {
    return this.bd.executeSql(
      `SELECT * FROM sesion_data WHERE user_name = ? AND password = ?`,
      [username, password] // <-- Agrega los parámetros aquí
    ).then(res => {
      if (res.rows.length > 0) {
        this.mostrarToast('Usuario validado correctamente');
        return res.rows.item(0); // retornar el primer usuario encontrado
      } else {
        this.mostrarToast('Usuario o contraseña incorrectos');
        return null;
      }
    }).catch(error => {
      this.mostrarToast('Error al validar usuario: ' + error.message);
      return null;
    });
  }

  // Actualizar datos de usuario:
  async actualizarDatosUsuario(username: string, nombre: string, apellido: string, nivelEducacion: string, fechaNacimiento: string) {
    return this.bd.executeSql(
      `INSERT OR REPLACE INTO mis_datos (user_name, nombre, apellido, nivel_educacion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)`,
      [username, nombre, apellido, nivelEducacion, fechaNacimiento]
    ).then(() => {
      this.mostrarToast('Datos de usuario actualizados correctamente');
    }).catch(error => {
      this.mostrarToast('Error actualizando datos de usuario: ' + error.message);
    });
  }

  // Obtener datos de usuario:
  async obtenerDatosUsuario(username: string) {
    return this.bd.executeSql(
      `SELECT * FROM mis_datos WHERE user_name = ?`,
      [username]
    ).then(res => {
      if (res.rows.length > 0) {
        return res.rows.item(0); // retornar el primer usuario encontrado
      } else {
        this.mostrarToast('No se encontraron datos para el usuario');
        return null;
      }
    }).catch(error => {
      this.mostrarToast('Error al obtener datos de usuario: ' + error.message);
      return null;
    });
  }

  async agregarrCertificacion(username: string, nombreCertificado: string, fechaObtencion: string, fechaVencimiento: string) {
    return this.bd.executeSql(
      `INSERT INTO certificaciones (user_name, nombre_certificado, fecha_obtencion, fecha_vencimiento) VALUES (?, ?, ?, ?)`,
      [username, nombreCertificado, fechaObtencion, fechaVencimiento]
    ).then(() => {
      this.mostrarToast('Certificación agregada correctamente');
    }).catch(error => {
      this.mostrarToast('Error al agregar certificación: ' + error.message);
    });
  }

  async obtenerCertificaciones(username: string) {
    return this.bd.executeSql(
      `SELECT * FROM certificaciones WHERE user_name = ?`,
      [username]
    ).then(res => {
      const certificaciones: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        certificaciones.push(res.rows.item(i));
      }
      return certificaciones;
    }).catch(error => {
      this.mostrarToast('Error al obtener certificaciones: ' + error.message);
      return [];
    });
  }

  async eliminarCertificacion(username: string, nombreCertificado: string, fechaObtencion: string) {
    return this.bd.executeSql(
      `DELETE FROM certificaciones WHERE user_name = ? AND nombre_certificado = ? AND fecha_obtencion = ?`,
      [username, nombreCertificado, fechaObtencion]
    ).then(() => {
      this.mostrarToast('Certificación eliminada correctamente');
    }).catch(error => {
      this.mostrarToast('Error al eliminar certificación: ' + error.message);
    });
  }

  async cerrarSesion(username: string) {
    return this.bd.executeSql(
      `UPDATE sesion_data SET active = 0 WHERE user_name = ?`,
      [username]
    ).then(() => {
      this.mostrarToast('Sesión cerrada correctamente');
      localStorage.removeItem('usuarioActivo'); // Limpiar el estado de conexión
    }).catch(error => {
      this.mostrarToast('Error al cerrar sesión: ' + error.message);
    });
  }



  getIsBDReady() {
    return this.bdLista.asObservable();
  }

}