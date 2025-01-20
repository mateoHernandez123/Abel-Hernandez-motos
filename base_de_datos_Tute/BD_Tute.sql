create database SSAA2;
use SSAA2;

-- Tabla Roles:
create table roles
(
	idrol int not null auto_increment primary key,
    tipo varchar(45) not null
);
ALTER TABLE roles
ADD CONSTRAINT tipo_uniquetipo UNIQUE (tipo);


-- Tabla usuarios: 
create table usuarios
(
	idusuarios INT NOT NULL AUTO_INCREMENT primary key,
    email varchar(45) not null unique,
	nombre_usuario VARCHAR(45) NOT NULL,
	contrasenia VARCHAR(100) NOT NULL,
	roles_idrol INT NOT NULL,
    constraint `fk_usuarios_roles`
    foreign key (`roles_idrol`)
    references`roles`(`idrol`)
);

SELECT * FROM usuarios;
use SSAA2;

-- Tabla de permisos: 

create table permisos(
idpermiso int auto_increment primary key,
nombre varchar(50) unique not null
);
SELECT * FROM permisos;
-- Tabla Roles Permisos: 
create table roles_permisos(
	rol_id int not null,
    permiso_id int not null,
    valor boolean not null,
    constraint `fk_rp_roles` foreign key (rol_id) references roles(idrol),
    constraint `fk_rp_permisos` foreign key (permiso_id) references permisos (idpermiso),
    primary key (rol_id, permiso_id)
);
SELECT * FROM roles_permisos;

-- Tabla Cuentas: 
CREATE TABLE cuentas (
  idcuentas INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) UNIQUE NOT NULL,
  tipo ENUM('A', 'P', 'PN', 'R+', 'R-') NOT NULL,
  recibe_saldo boolean not null,
  codigo varchar(20) not null,
  descripcion varchar(255) not null,
  activa boolean not null,
  padre_id INT,
  FOREIGN KEY (padre_id) REFERENCES cuentas(idcuentas)
);

Alter table cuentas add column monto_actual double(10,2) not null default 0;
SELECT * FROM cuentas;

alter table cuentas add constraint UQ_codigo unique (codigo);
alter table cuentas add CONSTRAINT UQ_nombre_recibe_saldo unique (nombre,recibe_saldo);


-- Tabla Asiento: 

CREATE TABLE asientos (
  idasiento INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  descripcion VARCHAR(50),
  usuario_id INT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios (idusuarios),
  CONSTRAINT uq_fecha_hora UNIQUE (fecha, hora)
);

-- Tabla cuenta_asiento: 
CREATE TABLE cuenta_asiento (
  asiento_id int NOT NULL,
  cuenta_id int NOT NULL,
  saldo int NOT NULL default 0,
  debe int NOT NULL,
  haber int NOT NULL,
  FOREIGN KEY (asiento_id) REFERENCES asientos (idasiento),
  FOREIGN KEY (cuenta_id) REFERENCES cuentas (idcuentas)
);

-- Tabla proveedores:

create table proveedores(
	idproveedor int not null primary key auto_increment,
    nombre varchar(100) not null,
    cuit varchar(20) not null unique,
    razon_social varchar(100) not null,
    telefono VARCHAR(20) not null, 
    correo VARCHAR(100) not null, 
    direccion VARCHAR(200) not null, 
    ciudad VARCHAR(100) not null, 
    provincia VARCHAR(100) not null, 
    codigo_postal VARCHAR(10) not null, 
    banco VARCHAR(100) not null, 
    nro_cuenta VARCHAR(22) not null,
    cbu varchar(22) not null,
    tipo_proveedor VARCHAR(50) not null, 
    rubro VARCHAR(100) not null, 
    calificacion INT , 
    comentarios text,
    activo bit not null
)



INSERT INTO roles(tipo)
VALUES ("admin");

UPDATE roles
SET tipo = 'basico' -- Lo tenia como admin antes
WHERE idrol = 2;
SELECT * FROM roles;

INSERT INTO usuarios (mail, nombre_usuario, contrasenia, roles_idrol)
VALUES ('mateo@hernandez', 'mateo', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 1);

INSERT INTO usuarios (mail, nombre_usuario, contrasenia, roles_idrol)
VALUES ('franco@liciaga', 'Franco Liciaga', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 2);

INSERT INTO usuarios (mail, nombre_usuario, contrasenia, roles_idrol)
VALUES ('leandro@chivel', 'Leandro Chivel', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 1);

INSERT INTO usuarios (mail, nombre_usuario, contrasenia, roles_idrol)
VALUES ('fernando@balbi', 'Fernando Balbi', '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705', 2);



UPDATE usuarios  set contrasenia = '173af653133d964edfc16cafe0aba33c8f500a07f3ba3f81943916910c257705' where mail = 'mateo@hernandez'; 


insert into permisos(nombre)
values('Cuentas'), ('Asientos'), ('Diarios'), ('Mayores'), ('Resultados'), ('Usuarios'),('Proveedores');

/*INSERTS DE PROVEEDORES*/

insert into permisos(nombre)
values('Proveedores');

select * from roles_permisos;

insert into roles_permisos(rol_id, permiso_id, valor)
values(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Proveedores' ),
    1
);

insert into roles_permisos(rol_id, permiso_id, valor)
values
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Cuentas' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Asientos' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Diarios' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Mayores' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Resultados' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Usuarios' ),
    1
),
(
	(select idrol from roles where tipo = 'admin' ),
    (select idpermiso from permisos where nombre = 'Proveedores' ),
    1
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Cuentas' ),
    0
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Asientos' ),
    1
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Diarios' ),
    0
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Mayores' ),
    0
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Resultados' ),
    0
),
(
	(select idrol from roles where tipo = 'basico' ),
    (select idpermiso from permisos where nombre = 'Usuarios' ),
    0
);


insert into cuentas(nombre, tipo, recibe_saldo, codigo, descripcion, activa)
values
('Activo', 'A', 0, '1', 'Cuenta padre de los Activos', 1),
('Pasivo', 'P', 0, '2', 'Cuenta padre de los Pasivos', 1), 
('Patrimonio Neto', 'PN', 0, '3', 'Cuenta padre de Patrimonio Neto', 1),
('Resultados Positivos', 'R+', 0, '4', 'Cuenta padre de los Resultados Positivos', 1),
('Resultados Negativos', 'R-', 0, '5', 'Cuenta padre de los Resultados Negativos', 1);


insert into cuentas(nombre, tipo, recibe_saldo, codigo, descripcion, activa, padre_id)
values('Cajas y Bancos', 'A', 0, '1.1', 'Subcategoria de Activo que engloba caja y banco', 1, (select c.idcuentas from cuentas as c where c.nombre = 'Activo'));

/*---------------------- SELECT ------------------------*/

-- Obtener los permisos de un usuario mediante el mail
select  p.nombre, rp.valor  
from roles as r inner join roles_permisos as rp on rp.rol_id = r.idrol 
    inner join permisos as p 
        on rp.permiso_id = p.idpermiso 
where r.idrol= (select u.roles_idrol 
                from usuarios as u 
                    where mail = 'email');

SELECT * FROM cuentas;

