require('colors');

const { guardarDB ,leerDB} = require('./helpers/guardarArchivo');
const {
    inquirerMenu ,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = "";
    const tareas = new Tareas()
    const tareasDB = leerDB();
    if(tareasDB){
        //establecer tareas
        tareas.cargarTareasFromArray(tareasDB)
    }
    
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1": //crear opcion  
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc)
                break;
            case "2"://
                // console.log(tareas.listadoArr);
                tareas.listadoCompleto();
                break;
            case "3"://listar completadas
                tareas.listarPendientesCompletadas();
                    break;
            case "4"://listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":// completados/pendientes
                // TODO: completar una tarea
                const ids = await mostarListadoChecklist (tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;
            case "6":// borrar tarea
                 const id = await listadoTareasBorrar(tareas.listadoArr);
                 if(id!=="0"){
                    const ok = await confirmar("Estas seguro de borrar este elemento?");
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log("Tarea borrada")
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr)

        await pausa()
    } while (opt !== "0")


}



main()